module.exports = {
    getStockBySymbol: function(models, request, response) {
        var symbol = request.params['symbol'];
        models.Company.findOne({where: {symbol: symbol}}).then(function(stock) {
            if (!stock)
                response.status(400).end('Bad request: Stock with this symbol does not exist. Case sentive.');
            else
                response.end(JSON.stringify(stock, null, 4));
        })
    },

    getStockNews: function(models, requestCall, request, response) {
		// Intrinio constants for News
		const username = "17440ee7fe0d7aeb1962fb3a18df9607";
		const password = "bd8d650b82b0f07cf98d893a9fde0bb7";
		var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
		var url = "https://api.intrinio.com/news?identifier=";

		var stocksymbol = request.params['symbol'];

		const options = {
	  		method: 'GET',
	  		uri: url + stocksymbol,
			headers: {
				"Authorization": auth
			}
		}

		requestCall(options, function(err, res, body){
			if(err){
				console.log(err);
			}

			var news = JSON.parse(body);
			news.data = news.data.slice(0,20);

			response.status(200).end(JSON.stringify(news));
		});
    }

    getStockHistory: function(models, request, response){
		// alphavantage API key
		const key = 0776;
		const URI = request.url;
		var stocksymbol = request.params['symbol'];

		// Check what request for history is made
		if(URI === '/api/stocks/:symbol/todayhistory'){

			var url = "http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" +
					  stocksymbol + "&interval=15min&outputsize=full&apikey=" + key;

			const options = {
		  		method: 'GET',
		  		uri: url,
		  		}

			requestCall(options, function(err, res, body) {
		    	if (err) {
					console.log(err);
				}

				response.status(200).end(JSON.stringify(body));
		  	});

		}else if(URI === '/api/stocks/:symbol/history'){

			var url = "http://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" +
					  stocksymbol + "&outputsize=full&apikey=" + key;

			const options = {
				method: 'GET',
				uri: url,
			}

			requestCall(options, function(err, res, body) {
				if (err) {
					console.log(err);
				}

				response.status(200).end(JSON.stringify(body));
			});
		}
    }
}
