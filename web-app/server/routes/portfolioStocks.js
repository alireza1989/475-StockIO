module.exports = {
	getStocksInPortfolio: function(models, request, response) {
        var userID = request.session.passport.user;
        var portfolioID = parseInt(request.params.portfolioId);

        models.User.findById(userID).then((user) => {
            user.getPortfolios({where: {id: portfolioID}}).then((portfolio) => {
                portfolio = portfolio[0];
                if (portfolio !== undefined) {
                    portfolio.getCompanies().then((stocks) => {
                        response.status(200).end(JSON.stringify({'stocks' : stocks}, null, 4));
                    });
                } else {
                    response.status(401).end(`Portfolio doesn't exist.`);
                }
            });
        });
    },

    addStockToPortfolio: function(io, requestCall, models, request, response) {
        var userID = request.session.passport.user;
        var portfolioID = parseInt(request.params.portfolioId, 10);
        var stockSymbol = request.body.symbol;

        models.User.findById(userID).then((user) => {
            user.getPortfolios({where: {id: portfolioID}}).then((portfolio) => {
                portfolio = portfolio[0];
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
                                    models.Portfolio.findById(portfolioID, {include: [{ model: models.Company}]
                                        }).then((newPortfolio) => {
                                            io.to('portfolio' + portfolioID).emit('updateStocks' + portfolioID, JSON.stringify(newPortfolio));
                                        }); 

                                    response.status(200).end(JSON.stringify({
                                        message: `Added stock ${company.symbol}`,
                                        action: 'add'
                                    }, null, 4));
                                });
                            } else {
                        // Intrinio constants for News
                                const username = "17440ee7fe0d7aeb1962fb3a18df9607";
                                const password = "bd8d650b82b0f07cf98d893a9fde0bb7";
                                var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');
                                var url = "https://api.intrinio.com/companies?identifier=" + stockSymbol;

                                const options = {
                                    method: 'GET',
                                    uri: url,
                                    headers: {
                                        "Authorization": auth
                                    }
                                }

                                requestCall(options, function(err, res, companyData) {
                                    if(err) {
                                        console.log("Error making request for stock symbol");
                                        return;
                                    }

                                    if (companyData == "") {
                                        response.status(400).end(JSON.stringify({'message' : 'Stock Symbol doesnt exist'}));
                                        return;
                                    }
                                    else {
                                        var companyData = JSON.parse(companyData);
                                        var url = `http://finance.google.com/finance/info?client=ig&q=${stockSymbol}`;
                                        
                                        requestCall(url, (err, res, stockData) => {
                                            if (err) {
                                                console.log('error getting stock data');
                                                return;
                                            }

                                            if (res.statusCode >= 400) {
                                                response.status(500).end(JSON.stringify({'message' : 'Error getting pricing data'}));
                                                return;
                                            }
                                            
                                            var stock = JSON.parse(stockData.substring(3));
                                            models.Company.create({
                                                'name': companyData.name, 
                                                'symbol': companyData.ticker,
                                                'stock_exchange': companyData.stock_exchange,
                                                'url': companyData.company_url,
                                                'ceo': companyData.ceo,
                                                'sector': companyData.sector,
                                                'last_price': stock[0].l_cur,
                                                'change_price': stock[0].c,
                                                'change_percent': stock[0].cp,
                                                'previous_close_price': stock[0].pcls_fix,
                                                'dividend': stock[0].div,
                                                'yield': stock[0].yld
                                            }).then(function (newCompany) {
                                                portfolio.addCompany(newCompany).then(function(updatedInfo) {
                                                    models.Portfolio.findById(portfolioID, {include: [{ model: models.Company}]}).then(function(newPortfolio){
                                                        io.to('portfolio' + portfolioID).emit('updateStocks' + portfolioID, JSON.stringify(newPortfolio));
                                                        response.status(200).end(JSON.stringify({'message' : 'Successfully added stock from elsewhere'}));
                                                    })
                                                })
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        response.status(401).end(JSON.stringify({'message' : 'Not authorized to change portfolio'}));
                    }
                } else {
                    response.status(400).end(JSON.stringify({'message' : 'Portfolio doesnt exist'}));
                }
            });
        });
    },

    deleteStockFromPortfolio: function(io, models, request, response) {        
        var userID = request.session.passport.user;
        var portfolioID = parseInt(request.params.portfolioId);
        var stockID = request.body.stockID;

        models.User.findById(userID).then((user) => {
            user.getPortfolios({where: {id: portfolioID}}).then((portfolio) => {
                portfolio = portfolio[0];
                if (portfolio !== undefined) {
                    var permission = portfolio.Users_Portfolios.permission;
                    if (permission === 'admin' || permission === 'write') {
                        portfolio.removeCompany(stockID).then(() => {
                            models.Portfolio.findById(portfolioID, {include: [{ model: models.Company}]
                                }).then((portfolioInstance) => {
                                    io.to('portfolio' + portfolioID).emit('updateStocks' + portfolioID, JSON.stringify(portfolioInstance));
                                }); 
                                
                            response.status(200).end(JSON.stringify({
                                message: `Removed stock`,
                                action: 'delete'
                            }, null, 4));
                        });
                    } else {
                        response.status(401).end('User does not have permission to modify portfolio.');
                    }
                } else {
                    response.status(401).end(`Portfolio doesn't exist.`);
                }
            });
        });
    }
}