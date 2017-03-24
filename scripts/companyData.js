// Helper to create a JSON file with company data pulled from Intrinio. Not to be included with application.
// The resulting output still needs to be massaged to align with JSON formatting.

var https = require("https");
const fs = require('fs');

//Intrinio user info
USERNAME = "4a44bb3be24d961e9679366fd23b753b"
PASSWORD = "40bb5f3b10038b557291badf18a2cd5a"
var auth = "Basic " + new Buffer(USERNAME + ':' + PASSWORD).toString('base64');

var COMPANIES = [
	'AAPL', 'AMZN', 'DIS',  'CSCO', 'FB',   'INTC', 'GOOG',
	'IBM',  'MMM',  'MCD',  'MSFT', 'NFLX', 'NVDA', 'PFE',
	'V',    'SBUX', 'TSLA', 'TXN',  'XOM',  'YHOO'
];

var companyInfo = [];

COMPANIES.forEach(function(company) {
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
	        var data = JSON.parse(json);
	        
	        data = {
	            'name':         data.name,
	            'symbol':       data.ticker,
	            'exchange':     data.stock_exchange,
	            'url':          data.company_url,
	            'ceo':          data.ceo,
	            'sector':       data.sector
	        }
	        
	        companyInfo.push(data);
	        
	        if (companyInfo.length === COMPANIES.length) {
    	        returnData();
	        }
	    });
	});
	
	request.end(); 
});


var returnData = function() {
    data = JSON.stringify({'company' : companyInfo}, null, 4);
	fs.appendFileSync('companies.json', data);
}