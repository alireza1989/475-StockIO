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

// Server
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var requestCall = require('request');


var Sequelize = require("sequelize");
var models = require('./db/models');
var routes = require('./server/routes');


// Session Management
var passport = require('passport');
var passportSocketIo = require('passport.socketio');

var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var LocalStrategy = require('passport-local').Strategy;
var sessionStore = new SequelizeStore({db: models.sequelize, table: 'Session'});

// Passport strategy modules
var localLoginStrategy = require('./server/passport/local-login');
var localSignupStrategy = require('./server/passport/local-signup');


////////////////////////////////////////////////////////////////////////////////////////
// CONFIGURE APP + REAL-TIME SOCKET
////////////////////////////////////////////////////////////////////////////////////////

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);
io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key: 'connect.sid',
    secret: 'keyboard kitty',
    store: sessionStore
}));

app.use('/static', express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard kitty',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());


////////////////////////////////////////////////////////////////////////////////////////
// SESSION MANAGEMENT
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
// User account actions
////////////////////////////////////////////////////////////////////////////////////////

// Middleware Managed API
app.post('/api/users/signup', passport.authenticate('signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup',
    session: true
}));

// Middleware Managed API
app.post('/api/users/login', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    session: true
}));

// Middleware Managed API
app.post('/api/users/logout', function(request, response) {
    request.session.destroy(function (err) {
        response.status(306).json({'redirect': '/login'});
  });
});

// Return information for current user
app.get('/api/users/current', function(request, response) {
    if (authenticate(request, response))
        routes.users.currentUserSession(models, request, response);
})


////////////////////////////////////////////////////////////////////////////////////////
// Manipulate portfolios
////////////////////////////////////////////////////////////////////////////////////////

// Return all portfolios for the current user
app.get('/api/portfolios', function (request, response) {
    if (authenticate(request, response))
        routes.portfolios.getPortfolios(models, request, response);
});

// Return a specific portfolio (portfolio defined by id)
app.get('/api/portfolios/:portfolioId', function (request, response) {
    if (authenticate(request, response))
        routes.portfolios.getPortfolioById(models, request, response);
});

// Modify a specific portfolio's name (portfolio defined by id)
app.post('/api/portfolios/:portfolioId', function (request, response) {
    if (authenticate(request, response))
        routes.portfolios.editPortfolioName(io, models, request, response);
});

// Create a new portfolio, currrent user has admin privilege
app.post('/api/portfolios', function (request, response) {
    if (authenticate(request, response))
        routes.portfolios.createPortfolio(io, models, request, response);
});

// Delete a specific portfolio (portfolio defined by id)
app.delete('/api/portfolios', function (request, response) {
    if (authenticate(request, response))
        routes.portfolios.deletePortfolio(io, models, request, response);
});


////////////////////////////////////////////////////////////////////////////////////////
// Manipulate stocks associated with a specific portfolio
////////////////////////////////////////////////////////////////////////////////////////

// Return all stocks held by the portfolio (portfolio defined by id)
app.get('/api/portfolios/:portfolioId/stocks', function (request, response) {
    if (authenticate(request, response))
        routes.portfolioStocks.getStocksInPortfolio(models, request, response);
});

// Add a stock to a portfolio (portfolio defined by id, stock defined by symbol)
app.post('/api/portfolios/:portfolioId/stocks', function(request,response){
    if (authenticate(request, response))
        routes.portfolioStocks.addStockToPortfolio(io, requestCall, models, request, response);
});

// Remove a stock from a portfolio (portfolio defined by id, stock defined by id)
app.delete('/api/portfolios/:portfolioId/stocks', function(request,response){
    if (authenticate(request, response))
        routes.portfolioStocks.deleteStockFromPortfolio(io, models, request, response);
});


////////////////////////////////////////////////////////////////////////////////////////
// Manipulate users associated with a specific portfolio
////////////////////////////////////////////////////////////////////////////////////////

// Return all users with access to the portfolio (portfolio defined by id)
app.get('/api/portfolios/:portfolioId/users', function (request, response) {
    if (authenticate(request, response))
        routes.portfolioUsers.getPortfolioUsers(models, request, response);
});

// Add a user to a portfolio (portfolio defined by id, user defined by username)
app.post('/api/portfolios/:portfolioId/users', function(request, response){
    if (authenticate(request, response))
        routes.portfolioUsers.addUserToPortfolio(io, models, request, response);
});

// Remove a user from a portfolio (portfolio defined by id, user defined by id)
app.delete('/api/portfolios/:portfolioId/users', function(request, response){
    if (authenticate(request, response))
        routes.portfolioUsers.deleteUserFromPortfolio(io, models, request, response);
});


////////////////////////////////////////////////////////////////////////////////////////
// Stocks
////////////////////////////////////////////////////////////////////////////////////////

app.get('/api/stocks/:symbol', function (request, response) {
    routes.stocks.getStockBySymbol(models, request, response);
});


////////////////////////////////////////////////////////////////////////////////////////
// News
////////////////////////////////////////////////////////////////////////////////////////

// Get the latest news from DB
app.get('/api/stocks/:symbol/news', function(request, response){
    routes.stocks.getStockNews(models, requestCall, request, response);
});

var authenticate = function(request, response) {
    if (!request.user) {
        response.status(306).json({'redirect': '/login'});
        return false;
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////
// PAGES
////////////////////////////////////////////////////////////////////////////////////////

app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'index.html'));
});


////////////////////////////////////////////////////////////////////////////////////////
// REAL-TIME
////////////////////////////////////////////////////////////////////////////////////////

io.on('connection', function(socket) {
    if (socket.request.user && socket.request.user.logged_in) {
        var userID = socket.request.user.id;
        console.log("User: " + userID + " logged on");

        routes.sockets.userConnected(userID, models, socket);
        socket.on('disconnect', function(data) {
            routes.sockets.userDisconnected(userID, models, socket,  data);
        });
    }
});

var COMPANIES = [];  //This data is retrieved from the DB on app start.
var listenForStockUpdates = function(url) {
    setInterval(function() {request(url, onStocksUpdate)}, UPDATE_FREQUENCY);
};

var onStocksUpdate = function(error, response, body) {
    // For google API financial data
    try {
        var data = JSON.parse(body.substring(3));
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
        quote.yield = (stock.yld == '' || stock.yld == undefined) ? 0 : stock.yld;

        models.Company.findOne({where: {symbol: quote.ticker}}).then(function(company) {

            if (company.last_price != quote.price) {
                return company.update({
                    last_price: quote.price,
                    change_price: quote.change_price,
                    change_percent: quote.change_percent,
                    previous_close_price: quote.previous_close_price,
                    dividend: quote.dividend,
                    yield: quote.yield
                });
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

    var url = 'http://finance.google.com/finance/info?client=ig&q=' + COMPANIES;
    requestCall(url, onStocksUpdate);

    //listenForStockUpdates(url);

    server.listen(PORT, function () {
        console.log('StockIO server listening on port ' + PORT + '. Open and accepting socket connections.');
    });
});
