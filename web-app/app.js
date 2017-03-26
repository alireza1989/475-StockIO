/* TrueNorth, CMPT 470, 2017-03-23 */

//////////////////////////////////////////////////
// CONSTANTS
//////////////////////////////////////////////////

const PORT = 3001;
const UPDATE_FREQUENCY = 10000 //ms

var COMPANIES = [];  //This data is retrieved from the DB on app start.

//////////////////////////////////////////////////
// REQUIREMENTS
//////////////////////////////////////////////////

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cheerio = require('cheerio');
var models = require('./models');

//////////////////////////////////////////////////
// CONFIGURE APP + REAL-TIME SOCKET
//////////////////////////////////////////////////

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard kitty',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


//////////////////////////////////////////////////
// 			SESSION MANAGEMENT
//////////////////////////////////////////////////

passport.use('login', new LocalStrategy(function (username, password, done) {
	models.User.findOne({where: {username: username}}).then(function(user) {
		if (!user)
			return done(null, false, { message: 'Incorrect username'});

		var correctPassword = user.validPassword(password);

		if (!correctPassword)
			return done(null, false, {message: 'Incorrect password'});

		return done(null, user);
	});
}));

passport.use('signup', new LocalStrategy ({passReqToCallback : true}, function (request, username, password, done) {
	var firstname = request.body['firstname'];
	var lastname = request.body['lastname'];
	var companies = request.body['companies']; // Array of id's

	//Check if password is long enough; otherwise send error.
	if (password.length < 8)
		return done(null, false, {message:'Password length must be at least 8 characters.'});

    models.User.create({
    	firstname: firstname,
    	lastname: lastname,
    	username: username,
    	password: models.User.hashPassword(password)
    }).then(function(user) {
    	//Create the user's first portfolio
    	models.Portfolio.create({ name: 'My First Portfolio'}).then(function (portfolio) {
    		user.addPortfolio(portfolio);

    		if (companies != '' && companies != null)
    			portfolio.setCompanies(companies);  //Add companies to it if the user has specified any.

    		done(null, user);
    	});
    }).catch(function(error) {
    	console.log('Error: something wrong when creating new user: ' + error);
    	done(null, false, {message: JSON.stringify(error['errors'])});
    });
}));

passport.serializeUser(function(user, done) {
	console.log("serialize user:");
  return done(null, user.id);
});

passport.deserializeUser(function(userId, done) {
	console.log('deserailizeuser');
	models.User.findById(userId).then(function (user) {
		if (!user)
			return done(null, false);

		return done(null, user);
	})
});


//////////////////////////////////////////////////
// PAGES
//////////////////////////////////////////////////
app.get('/', function(request, response) {
    response.redirect(301, 'http://localhost:3000/dashboard');
});

app.get('/dashboard', function(request, response) {
    loadPage(request, response, 'index.html');
});

var loadPage = function(request, response, page) {
//     if (request.session) {
        response.status(200);
        response.setHeader('Content-Type', 'text/html');

        var fPath = path.join(__dirname, page);
        fs.createReadStream(fPath).pipe(response);
//    } else {
//        response.redirect(301, 'http://localhost:3000/login');
//    }
}

// Middleware managed. Do not alter route.
app.post('/signup', passport.authenticate('signup', {
	successRedirect: '/dashboard',
    failureRedirect: '/signup',
    session: true
}));

// Middleware managed. Do not alter route.
app.post('/login', passport.authenticate('login', {
	successRedirect: '/dashboard',
    failureRedirect: '/login',
    session: true
}));

// Middleware managed. Do not alter route.
app.get('/logout', function(request, response) {
  request.logout();
  response.redirect('/');
});

//////////////////////////////////////////////////
// 						API
//////////////////////////////////////////////////

app.get('/api/quote/', function (request, response) {
	models.Company.findAll({attributes: ['id', 'symbol', 'last_price']}).then(function(prices) {
		response.send(JSON.stringify(prices));
	})
});

app.get('/api/quote/:symbol', function (request, response) {
    var symbol = request.params['symbol'];
	models.Company.findOne({where: {symbol: symbol}, attributes: ['id', 'symbol', 'last_price']}).then(function(price) {
		if (!price)
			response.status(400).send("Invalid Symbol (Case sensitive)");
		else
			response.send(JSON.stringify(price));
	})
});

app.get('/api/company', function (request, response) {
	models.Company.findAll().then(function(companies) {
		response.send(JSON.stringify(companies));
	});
});

app.get('/api/portfolio', function (request, response) {
	if (!request.user) {
		response.redirect(401, '/login');
		return;
	}

	var sessionUserId = request.session.passport.user;
	 models.User.findById(sessionUserId)
	.then(function(user) {
		if (user)
			return user.getPortfolios();
	})
	.then(function(portfolios) {
		response.end(JSON.stringify(portfolios));
	})
});

app.post('/api/portfolio/:portfolioId/invite', function(request, response)
{
	if (!request.user) {
		response.redirect(401, '/login');
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

app.get('/api/invitation', function(request, response) {
	if (!request.user) {
		response.redirect(401, '/login');
		return;
	}
	var sessionUserId = request.session.passport.user;

	models.User.findById(sessionUserId).then(function(user) {
		return user.getInvitations({where: {hasResponded: false}});
	}).then(function(invitations) {
		response.end(JSON.stringify(invitations));
	})
});

//Accept or decline invitation
app.post('/api/invitation/:invitationId', function(request, response) {
	if (!request.user) {
		response.redirect(401, '/login');
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


//////////////////////////////////////////////////
// REAL-TIME
//////////////////////////////////////////////////
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
		quote.change = stock.c;
		quote.change_percent = stock.cp;
		quote.last_trade_time = stock.lt;

		models.Company.findOne({where: {symbol: quote.ticker}}).then(function(company) {

			if (company.last_price != quote.price) {
				console.log("Price change! From " + company.last_price + ' to ' + quote.price + " for company " + quote.ticker);
				return company.update({last_price: parseFloat(quote.price)});
			}
		}).then(function(updatedCompany) {
			if (updatedCompany) {
				io.to(quote.ticker).emit('tickerUpdate', JSON.stringify(quote));
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
	request(url, onStocksUpdate);

	//listenForStockUpdates();

	server.listen(PORT, function () {
		console.log('StockIO server listening on port ' + PORT + '. Open and accepting socket connections.');
	});
});
