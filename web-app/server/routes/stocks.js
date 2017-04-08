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
			if (err) {
				console.log(err);
			}

			var news = JSON.parse(body);
            if (news.data !== undefined) {
    			news.data = news.data.slice(0,20);
            }
            
			response.status(200).end(JSON.stringify(news));
		});
    },

    getStockHistory: function(models, requestCall, request, response){

		// Create a Date OBJ
		var now = new Date();
		const URI = request.url;
		var stocksymbol = request.params['symbol'];
		// Intrinio constants for News
		const username = "17440ee7fe0d7aeb1962fb3a18df9607";
		const password = "bd8d650b82b0f07cf98d893a9fde0bb7";
		var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
		var url = "https://api.intrinio.com/historical_data?identifier=";


		// Check what request for history is made
		if(URI === `/api/stocks/${stocksymbol}/history/daily`){

			var fiveDay = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + (now.getDate()-5);
			url = url + `${stocksymbol}&item=adj_close_price&start_date=${fiveDay}&frequency=daily&sort_order=asc`

			const options = {
				method: 'GET',
				uri: url,
				headers: {
					"Authorization": auth
				}
			}

			requestCall(options, function(err, res, body) {
		    	if (err) {
					console.log(err);
				}
				response.status(200).end(JSON.stringify(body));
		  	});

		}else if(URI === `/api/stocks/${stocksymbol}/history/weekly`){

			var currentDate = (now.getFullYear()-1) + '-' + (now.getMonth()+1) + '-' + now.getDate();
			url = url + `${stocksymbol}&item=adj_close_price&start_date=${currentDate}&frequency=weekly&sort_order=asc`

			const options = {
				method: 'GET',
				uri: url,
				headers: {
					"Authorization": auth
				}
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
