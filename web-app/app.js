////////////////////////////////////////////////////////////////////////////////////////
// CONSTANTS
////////////////////////////////////////////////////////////////////////////////////////
const PORT = 3001;
const UPDATE_FREQUENCY = 10000 //ms


////////////////////////////////////////////////////////////////////////////////////////
// REQUIREMENTS
////////////////////////////////////////////////////////////////////////////////////////
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

//Server
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');

var Sequelize = require("sequelize");
var models = require('./db/models');


//Session Management
var passport = require('passport');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var LocalStrategy = require('passport-local').Strategy;

//Passport strategy modules
var localLoginStrategy = require('./server/passport/local-login');
var localSignupStrategy = require('./server/passport/local-signup');


////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURE APP + REAL-TIME SOCKET
////////////////////////////////////////////////////////////////////////////////////////

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard kitty',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({db: models.sequelize, table: 'Session'})
}));
app.use(passport.initialize());
app.use(passport.session());


////////////////////////////////////////////////////////////////////////////////////////
// 			SESSION MANAGEMENT
////////////////////////////////////////////////////////////////////////////////////////
passport.use('signup', localSignupStrategy);
passport.use('login', localLoginStrategy);
passport.serializeUser(function(user, done) {
	return done(null, user.id);
});
passport.deserializeUser(function(userId, done) {
	models.User.findById(userId).then(function (user) {
		if (!user)
			return done(null, false);

		return done(null, user);
	})
});


////////////////////////////////////////////////////////////////////////////////////////
// PAGES
////////////////////////////////////////////////////////////////////////////////////////

//Not used at moment.
// app.get('/', function(request, response) {
//     response.redirect(301, 'http://localhost:3000/dashboard');
// });

// app.get('*', function(request, response) {
//     loadPage(request, response, 'index.html');
// });

// var loadPage = function(request, response, page) {
//         response.status(200);
//         response.setHeader('Content-Type', 'text/html');

//         var fPath = path.join(__dirname, page);
//         fs.createReadStream(fPath).pipe(response);
//        response.redirect(301, 'http://localhost:3000/login');
// }

////////////////////////////////////////////////////////////////////////////////////////
// User account actions
////////////////////////////////////////////////////////////////////////////////////////

//Middleware Managed API
app.post('api/users/signup', passport.authenticate('signup', {
	successRedirect: '/dashboard',
    failureRedirect: '/login',
    session: true
}));

//Middleware Managed API
app.post('/api/users/login', passport.authenticate('login', {
	successRedirect: '/dashboard',
    failureRedirect: '/login',
    session: true
}));

//Middleware Managed API
app.post('/api/users/logout', function(request, response) {
    request.session.destroy(function (err) {
        response.status(306).json({'redirect': '/login'});
  });
});

// Return information for current user
app.get('/api/users/current', function(request, response) {
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }
    
    var sessionUserId = request.session.passport.user;
    models.User.findById(sessionUserId, {
        attributes: ['id', 'username', 'firstname', 'lastname']
    }).then(function (user) {
        response.end(JSON.stringify(user, null, 4));
	});
})


////////////////////////////////////////////////////////////////////////////////////////
// Manipulate portfolios
////////////////////////////////////////////////////////////////////////////////////////

// Return all portfolios for the current user
app.get('/api/portfolios', function (request, response) {
	if (!request.user) {
        response.status(306).json({'redirect': '/login'});
		return;
	}

	var sessionUserId = request.session.passport.user;

	models.User.findById(sessionUserId).then(function(user) {
		if (user)
			return user.getPortfolios();
	}).then(function(portfolios) {
        var count = 0;
        var total = portfolios.length;
        var portfoliosData = [];
        portfolios.forEach(function(portfolioList) {
            var portfolioData = {
                id: portfolioList.id,
                name: portfolioList.name,
                permission: portfolioList.Users_Portfolios.permission
            }
            portfoliosData.push(portfolioData);
            count++;
            if (count === total){
                console.log("sending portfolio data");
                response.end(JSON.stringify({'portfolios': portfoliosData}, null, 4))
            }
        });
	})
});

// Return a specific portfolio (portfolio defined by id)
app.get('/api/portfolios/:portfolioId', function (request, response) {
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }
    var userId = request.session.passport.user;
    var portfolioId = request.params['portfolioId'];
    models.User.findById(userId).then(function(user) {
        if (user)
            return user.getPortfolios({where: {id: portfolioId}});
    }).then(function(portfolio) {
        if (portfolio.length == 0)
        {
            response.send('401', 'Not authorized');
            return;
        }
        var portfoliosData = [];
        portfolioData = {
            id: portfolio[0].id,
            name: portfolio[0].name
        }
        portfoliosData.push(portfolioData);
        response.end(JSON.stringify(portfoliosData, null, 4))
    })
});

// Create a new portfolio, currrent user has admin privilege
app.post('/api/portfolios', function (request, response) {
	if (!request.user) {
        response.status(306).json({'redirect': '/login'});
		return;
	}

    var userId = request.session.passport.user;
    var portfolioName = request.body.name;

    models.Portfolio.create({
        name: portfolioName
    }).then(function(portfolioInstance) {
        var portfolioID = portfolioInstance.id;
        portfolioInstance.addUser(userId, {permission: 'admin'});
        response.end(JSON.stringify({'portfolioID' : portfolioID}, null, 4));
    });
});

// Delete a specific portfolio (portfolio defined by id)
app.delete('/api/portfolios/:portfolioId', function (request, response) {
	if (!request.user) {
        response.status(306).json({'redirect': '/login'});
		return;
	}

    var userId = request.session.passport.user;
    var portfolioId = request.params['portfolioId'];

    models.User.findById(userId)
    .then(function(user) {
        user.getPortfolios({where: {id: portfolioId }}).then(function(portfolio) {
            if (portfolio.length === 0) {
                console.log("No access to portfolio");
                    response.status(401).end('No Unauthorized access to portfolio');
    			return;
            }

            var permission = portfolio[0].Users_Portfolios.permission;
            console.log(permission);
            if(permission === "admin" || permission === 'write') {
                user.removePortfolio(portfolio);
                response.end("You have deleted your portfolio " + portfolioId);
            }
            else {
                console.log("You have the wrong permissions");
                response.status(401).end('Unauthorized access to portfolio');
    			return;
            }
        });
	});
});


////////////////////////////////////////////////////////////////////////////////////////
// Manipulate stocks associated with a specific portfolio
////////////////////////////////////////////////////////////////////////////////////////

// Return all stocks held by the portfolio (portfolio defined by id)
app.get('/api/portfolios/:portfolioId/stocks', function (request, response) {
    // TODO: Replace with "auth" function
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }
    
    var userID = request.session.passport.user;
    var portfolioID = parseInt(request.params.portfolioId);
    
    models.User.findById(userID).then((user) => {
        user.getPortfolios().then((portfolios) => {
            var portfolio = portfolios.find((p) => { return p.id === portfolioID });            
            if (portfolio !== undefined) {
                portfolio.getCompanies().then((stocks) => {
                    response.status(200).end(JSON.stringify({'stocks' : stocks}, null, 4));
                });
            } else {
                response.status(401).end('Unauthorized access to portfolio');
            }
        });
    });
});

// Add a stock to a portfolio (portfolio defined by id, stock defined by symbol)
app.post('/api/portfolios/:portfolioId/stocks', function(request,response){    
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }

    var userID = request.session.passport.user;
    var portfolioID = parseInt(request.params.portfolioId);
    var stockSymbol = request.body.symbol;
    
    models.User.findById(userID).then((user) => {
        user.getPortfolios().then((portfolios) => {
            var portfolio = portfolios.find((p) => { return p.id === portfolioID });            
            if (portfolio !== undefined) {
                var permission = portfolio.Users_Portfolios.permission;
                if (permission === 'admin' || permission === 'write') {
                    models.Company.findOne({
                        where: [{
                        	symbol: stockSymbol
                        }]
                	}).then((company) => {
                        if (company !== null) {
                            portfolio.addCompany(company).then(() => {
                                console.log(`Added stock ${company.symbol}`);
                                response.status(200).end(`Added stock ${company.symbol}`);
                            });
                        } else {
                            // TODO: Need to get the stock from Intrinio
                            response.status(200).end('Could not add stock -- need to lookup Intrinio');
                        }
                	});                    
                } else {
                    response.status(401).end('User does not have permission to modify portfolio.');
                }
            } else {
                response.status(401).end('Unauthorized access to portfolio.');
            }
        });
    });
});

// Remove a stock from a portfolio (portfolio defined by id, stock defined by id)
app.delete('/api/portfolios/:portfolioId/stocks', function(request,response){
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }

    var userID = request.session.passport.user;
    var portfolioID = parseInt(request.params.portfolioId);
    var stockID = request.body.stockID;
    
    models.User.findById(userID).then((user) => {
        user.getPortfolios().then((portfolios) => {
            var portfolio = portfolios.find((p) => { return p.id === portfolioID });            
            if (portfolio !== undefined) {
                var permission = portfolio.Users_Portfolios.permission;                
                if (permission === 'admin' || permission === 'write') {
                    portfolio.removeCompany(stockID).then(() => {
                        response.status(200).end(`Removed stock ${stockID}`);
                    });
                } else {
                    response.status(401).end('User does not have permission to modify portfolio.');
                }
            } else {
                response.status(401).end('Unauthorized access to portfolio.');
            }
        });
    });
});


////////////////////////////////////////////////////////////////////////////////////////
// Manipulate users associated with a specific portfolio
////////////////////////////////////////////////////////////////////////////////////////

// Return all users with access to the portfolio (portfolio defined by id)
app.get('/api/portfolios/:portfolioId/users', function (request, response) {
    // TODO: Replace with "auth" function
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }
    
    var userID = request.session.passport.user;
    var portfolioID = parseInt(request.params.portfolioId);
    
    models.Portfolio.findById(portfolioID).then((portfolio) => {
        portfolio.getUsers().then((users) => {
            var currentUser = users.find((u) => { return u.id === userID });            
            if (currentUser !== undefined) {
                users = users.map((user) => {
                    return {
                        'id': user.id,
                        'username': user.username,
                        'firstname': user.firstname,
                        'lastname': user.lastname,
                        'permission': user.Users_Portfolios.permission
                    }
                });
                
                response.status(200).end(JSON.stringify({'users' : users}, null, 4));
            } else {
                response.status(401).end('Unauthorized access to portfolio');
            }
        });
    });
});

// Add a user to a portfolio (portfolio defined by id, user defined by username)
app.post('/api/portfolios/:portfolioId/users', function(request, response){
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }
    
    var userID = request.session.passport.user;
    var portfolioID = parseInt(request.params.portfolioId);
    var memberUsername = request.body.username;
    
    models.User.findById(userID).then((user) => {
        user.getPortfolios().then((portfolios) => {
            var portfolio = portfolios.find((p) => { return p.id === portfolioID });            
            if (portfolio !== undefined) {
                var permission = portfolio.Users_Portfolios.permission;
                if (permission === 'admin') {
                    models.User.findOne({
                        where: [{
                        	username: memberUsername
                        }]
                	}).then((member) => {
                        if (member !== null) {
                            // TODO: Need to pass the permission type from the frontend
                            portfolio.addUser(member, { permission: 'write' }).then(() => {
                                console.log(`Added member ${member.username}`);
                                response.status(200).end(`Added member ${member.username}`);
                            }).catch((err) => {
                                console.log(err);
                                response.status(401).end();
                            });
                        } else {
                            response.status(200).end(`Member doesn't exist`);
                        }
                	});                    
                } else {
                    response.status(401).end('User does not have permission to modify portfolio.');
                }
            } else {
                response.status(401).end('Unauthorized access to portfolio.');
            }
        });
    });

});

// Remove a user from a portfolio (portfolio defined by id, user defined by id)
app.delete('/api/portfolios/:portfolioId/users', function(request, response){
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return;
    }

    var userID = request.session.passport.user;
    var portfolioID = parseInt(request.params.portfolioId);
    var memberID = request.body.memberID;
    
    models.User.findById(userID).then((user) => {
        user.getPortfolios().then((portfolios) => {
            var portfolio = portfolios.find((p) => { return p.id === portfolioID });            
            if (portfolio !== undefined) {
                var permission = portfolio.Users_Portfolios.permission;                
                if (permission === 'admin') {
                    portfolio.removeUser(memberID).then(() => {
                        response.status(200).end(`Removed suer ${memberID}`);
                    });
                } else {
                    response.status(401).end('User does not have permission to modify portfolio.');
                }
            } else {
                response.status(401).end('Unauthorized access to portfolio.');
            }
        });
    });
});


////////////////////////////////////////////////////////////////////////////////////////
// Stocks
////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/stocks/:symbol', function (request, response) {
    var symbol = request.params['symbol'];
    models.Company.findOne({where: {symbol: symbol}}).then(function(stock) {
        if (!stock)
            response.status(306).json({'redirect': '/login'});
        else
            response.end(JSON.stringify(stock, null, 4));
	})
});


////////////////////////////////////////////////////////////////////////////////////////
// News
////////////////////////////////////////////////////////////////////////////////////////

// Get the latest news from DB
app.get('/api/news', function(request, response){    
    // IN production uncomment the following code
    // if (!request.user) {
    //   response.redirect(401, '/login');
    //   return;
    // }

    models.News.findAll().then(function(news){
        response.send(JSON.stringify(news));
    });
});


////////////////////////////////////////////////////////////////////////////////////////
// Invitations (not used)
////////////////////////////////////////////////////////////////////////////////////////

// Send user an invtation to a specific portfolio (portfolio defined by id)
app.post('/api/portfolios/:portfolioId/invite', function(request, response) {
	if (!request.user) {
        response.status(306).json({'redirect': '/login'});
		return;
	}

	var sessionUserId = request.session.passport.user;
	var receiverEmail = request.body['email'];
	var portfolioId = request.params['portfolioId'];

	//Check if the user even has access to the portfolio in the first place.
	models.User.findById(sessionUserId).then(function(user) {
		if (user)
			return user.getPortfolios({where: {id: portfolioId}});
	}).then(function(portfolio) {
		console.log("PORTFOLIO LENGTH " + portfolio.length);
		if (portfolio.length === 0) {
			console.log("No access to portfolio");
			response.status(401).end('Unauthorized access to portfolio');
			return;
		}

		models.User.findOne({where: {username: receiverEmail}}).then(function(receiver) {
			if (!receiver) {
				response.status(401).end("User doesn't exist");
				return;
			}

			models.Invitation.create({
				senderId: parseInt(sessionUserId),
				receiverId: parseInt(receiver.id),
				portfolioId: parseInt(portfolioId),
				accepted: false
			}).then(function(invitation) {
				receiver.addInvitation(invitation);
				response.end(JSON.stringify(invitation));
				console.log("Session User: " + sessionUserId);
	 		}).catch(function(error) {
	 			console.log(error);
	 			response.status(429).end('Already sent invitation to user for this portfolio.');
			});
		});
	});
});

// Get users current portfolio invitations
app.get('/api/invitation', function(request, response) {
	if (!request.user) {
        response.status(306).json({'redirect': '/login'});
		return;
	}
	var sessionUserId = request.session.passport.user;

	models.User.findById(sessionUserId).then(function(user) {
		return user.getInvitations({where: {hasResponded: false}});
	}).then(function(invitations) {
		response.end(JSON.stringify(invitations));
	})
});

// Accept or decline a specific invitation (invitation defined by id)
app.post('/api/invitation/:invitationId', function(request, response) {
	if (!request.user) {
        response.status(306).json({'redirect': '/login'});
		return;
	}

	var sessionUserId = request.session.passport.user;
	var invitationId = request.params['invitationId'];
	var accepted = request.body['accepted']; //Boolean

	models.User.findById(sessionUserId).then(function(user) {
		return user.getInvitation({where: {id: invitationId}})
	}).then(function(invitation) {
		if (!invitation) {
			response.status(401).end('Not authorized to respond to this invitation');
			return;
		}

		invitation.update({hasResponded: true});

		if (accepted) {
			var portfolioId = invitation.portfolioId;
			user.addPortfolio(portfolioId);
			//Probably do some socket related update notification here as well.
		}
	})

});


////////////////////////////////////////////////////////////////////////////////////////
// REAL-TIME
////////////////////////////////////////////////////////////////////////////////////////
io.on('connection', function(socket) {
	console.log('Client connected to websocket.');

	// Stream real-time changes of prices for specified stocks.
	socket.on('join', function(data) {
		var stocksToWatch = data; //Need to JSON parse??
		stocksToWatch['stocks'].forEach(function(stockSymbol) {
			socket.join(stockSymbol);  //Join the room for a particular stock
		});
	});

	// Stop getting updates of prices for specified stocks.
	socket.on('leave', function(data) {
		var stocksToStopWatch = data
		stocksToWatch['stocks'].forEach(function(stockSymbol) {
			socket.leave(stockSymbol);
		});
	});

	//Listen for updates to your account via user Id- Invitations, portfolio changes, etc.
	socket.on('updates', function(data) {
		var sessionKey = data;
		var userId;  //TODO: extract userId from sessionKey.
		socket.join(userId);
	});

	socket.on('stopUpdates', function(data) {
		var sessionKey = data;
		var userId; //TODO: extract userId from sessionKey.
		socket.leave(userId);
	});

	socket.on('disconnect', function() {
		console.log('Client disconnected.');
	});
});

var COMPANIES = [];  //This data is retrieved from the DB on app start.
var listenForStockUpdates = function() {
	var url = 'http://finance.google.com/finance/info?client=ig&q=NASDAQ:' + COMPANIES;
	setInterval(function() {request(url, onStocksUpdate)}, UPDATE_FREQUENCY);
};

var onStocksUpdate = function(error, response, body) {
	// For google API financial data
	try {
		data = JSON.parse(body.substring(3));
	} catch(e) {
		console.log("Invalid JSON returned from stocks-update query.")
		return false;
	}

	data.forEach(function(stock) {
		var quote = {};
		quote.ticker = stock.t;
		quote.price = stock.l_cur;
		quote.change_price = stock.c;
		quote.change_percent = stock.cp;
		quote.last_trade_time = stock.lt;
        quote.previous_close_price = stock.pcls_fix;
        quote.dividend = (stock.div == '' || stock.div == undefined) ? 0 : stock.div;
        quote.yield = (stock.yld == '' || stock.ylr == undefined) ? 0 : stock.yld;

console.log(quote);
		models.Company.findOne({where: {symbol: quote.ticker}}).then(function(company) {

			if (company.last_price != quote.price) {
				//console.log("Price change! From " + company.last_price + ' to ' + quote.price + " for company " + quote.ticker);
				return company.update({last_price: parseFloat(quote.price), change_price: parseFloat(quote.change_price), change_percent: parseFloat(quote.change_percent), previous_close_price: parseFloat(quote.previous_close_price), dividend: parseFloat(quote.dividend), yield: parseFloat(quote.yield)});
			}
		}).then(function(updatedCompany) {
			if (updatedCompany) {
				io.to(quote.ticker).emit(quote.ticker, JSON.stringify(quote));
			} else
				console.log("No changes for " + quote.ticker);
		});
	});
}

models.sequelize.sync().then(function() {
	return models.Company.findAll({attributes: ['symbol']});
}).then(function (companies) {
	COMPANIES = Object.keys(companies).map(function (key) { return companies[key].symbol; }); //Stores stock symbols in array

	var url = 'http://finance.google.com/finance/info?client=ig&q=NASDAQ:' + COMPANIES;
	//request(url, onStocksUpdate);

	//listenForStockUpdates();

	server.listen(PORT, function () {
		console.log('StockIO server listening on port ' + PORT + '. Open and accepting socket connections.');
	});
});
