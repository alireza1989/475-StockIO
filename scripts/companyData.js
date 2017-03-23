// Helper to create a JSON file with company data pulled from Intrinio. Not to be included with application.
// The resulting output still needs to be massaged to align with JSON formatting.

var https = require("https");
const fs = require('fs');

//Intrinio user info
USERNAME = "4a44bb3be24d961e9679366fd23b753b"
PASSWORD = "40bb5f3b10038b557291badf18a2cd5a"
var auth = "Basic " + new Buffer(USERNAME + ':' + PASSWORD).toString('base64');

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

COMPANIES.forEach(function(company)
{
	var request = https.request({
	    method: "GET",
	    host: "api.intrinio.com",
	    path: "/companies?ticker=" + company,
	    headers: { "Authorization": auth }
	}, function(response) {
	    var json = "";
	    response.on('data', function (chunk) {
	        json += chunk;
	    });
	    response.on('end', function() {
	        var company = JSON.parse(json);

	        var body = {}
	        body.name = company.name;
	        body.symbol = company.ticker;
	        body.description = company.long_description;
	        body.stock_exchange = company.stock_exchange;
	        body.url = company.company_url;
	        body.ceo = company.ceo;

        	fs.appendFileSync('stocks.json', JSON.stringify(body) + ',');
	    });
	});
	request.end(); 
});