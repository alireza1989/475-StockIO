var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var request = require('request');
var passport = require('passport');
var bcrypt = require('bcrypt');

const PORT = 3000;
const UPDATE_FREQUENCY = 10000 //ms

//TODO: Get this data from DB. 
var COMPANIES = [
	'AAPL',
	'AMZN',
	'DIS',
	'CSCO',
	'FB',
	'INTC',
	'GOOG',
	'IBM',
	'MMM',
	'MCD',
	'MSFT',
	'NFLX',
	'NVDA',
	'PFE',
	'V',
	'SBUX',
	'TSLA',
	'TXN',
	'XOM',
	'YHOO'
];

// var models = require('./models');

var app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//TODO: Passport Authentication

var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT, function () {
	console.log('StockIO server listening on port ' + PORT + '. Open and accepting socket connections.');
	listenForStockUpdates();

	io.on('connection', function(socket) {  
		console.log('Client connected to websocket.');

		// Stream real-time changes of prices for specified stocks.
		socket.on('followStocks', function(data) {
			var stocksToWatch = data; //Need to JSON parse??
			stocksToWatch['stocks'].forEach(function(stockSymbol) {
				socket.join(stockSymbol);  //Join the room for a particular stock
			});
		});

		// Stop getting updates of prices for specified stocks.
		socket.on('stopFollowStocks', function(data) {
			var stocksToStopWatch = data
			stocksToWatch['stocks'].forEach(function(stockSymbol) {
				socket.leave(stockSymbol);
			});
		});

		//Listen for updates to your account via user Id- Invitations, portfolio changes, etc.
		socket.on('listenForUpdates', function(data) {
			var sessionKey = data;
			var userId;  //TODO: extract userId from sessionKey. 
			socket.join(userId);
		});

		socket.on('stopListenForUpdates', function(data) {
			var sessionKey = data;
			var userId; //TODO: extract userId from sessionKey. 
			socket.leave(userId);
		});

		socket.on('disconnect', function() {
			console.log('Client disconnected.');
		});
	});
});

var listenForStockUpdates = function() {
	var url = 'http://finance.google.com/finance/info?client=ig&q=' + COMPANIES;
	setInterval(function() {request(url, onStocksUpdate)}, UPDATE_FREQUENCY);
}

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
		quote.exchange = stock.e;
		quote.price = stock.l_cur;
		quote.change = stock.c;
		quote.change_percent = stock.cp; 
		quote.last_trade_time = stock.lt;

		console.log(quote);
		//TODO: Compare last price or last trade time with current. If there is a change, emit to sockets subscribed to that stock index.
		//Update the DB with the most recent time or price.
		io.to(quote.ticker).emit('tickerUpdate', JSON.stringify(quote));
	});
}

app.post('/createAccount', function (request, response) {
	// Hash password, add to DB. If new user has initialized set of stocks to follow, add that to DB as well.
	console.log('Creating Account.');
});

app.post('/login', function (request, response) {
	console.log('User logging into account.');
	//Authenticate and Authorize, cookie data.
});

app.get('/api/stockdata/:id', function (request, response) {
	console.log('Request for the last known price of a specific stock.');
});

app.get('/api/stockdata/', function (request, response) {
	console.log('Request for last known prices of all stock information.');
});

app.get('/api/companydata', function (request, response) {
	console.log('Request for all available companies and their information.');
});

app.post('/api/invitation', function(request, response) {
	console.log('Received an invitation to send to a user.');
});

app.get('/api/invitation', function(request, response) {
	console.log('Getting all unhandled (accepted/declined) invitations received for user.');
});