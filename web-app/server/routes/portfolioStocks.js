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

    addStockToPortfolio: function(io, models, request, response) {
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
                                // TODO: Need to get the stock from Intrinio
                                response.status(200).end('Could not add stock -- need to lookup Intrinio');
                            }
                        });
                    } else {
                        response.status(401).end('User does not have permission to modify portfolio.');
                    }
                } else {
                    response.status(401).end(`Portfolio doesn't exist.`);
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