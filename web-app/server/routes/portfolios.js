var sockets = require('./sockets.js');

module.exports = {
    createPortfolio: function(io, models, request, response) {
        var userID = request.session.passport.user;
        var portfolioName = request.body.name;

        models.Portfolio.create({
            name: portfolioName
        }).then((portfolio) => {
            portfolio.addUser(userID, {permission: 'admin'});

            var portfolioData = {
                id: portfolio.id,
                name: portfolio.name,
                permission: 'admin'
            };

            sockets.newPortfolio(userID, portfolio.id);

            response.status(200).end(JSON.stringify({
                message: `Added portfolio ${portfolio.name}`,
                action: 'add',
                portfolio: portfolioData
            }, null, 4));
        });
    },

    deletePortfolio: function(io, models, request, response) {
        var userID = request.session.passport.user;
        var portfolioID = request.body.portfolioID;

        models.User.findById(userID).then((user) => {
            user.getPortfolios({where: {id: portfolioID}}).then((portfolio) => {
                portfolio = portfolio[0];
                if (portfolio !== undefined) {
                    var permission = portfolio.Users_Portfolios.permission;
                    if (permission === 'admin') {
                        user.removePortfolio(portfolio).then(() => {
                            io.to('portfolio' + portfolioID).emit('deletePortfolio', JSON.stringify({'portfolioId': portfolioID}));
                            
                            response.status(200).end(JSON.stringify({
                                message: `Removed portfolio`,
                                action: 'delete'
                            }, null, 4));
                        })
                    } else {
                        response.status(401).end('User does not have permission to modify portfolio.');
                    }
                } else {
                    response.status(401).end(`Portfolio doesn't exist.`);
                }
            });
        });
    },

    getPortfolios: function(models, request, response) {
        var userID = request.session.passport.user;

        models.User.findById(userID).then((user) => {
            user.getPortfolios().then((portfolios) => {
                portfolios = portfolios.map((portfolio) => {
                    console.log(JSON.stringify(portfolio))
                    return {
                        'id': portfolio.id,
                        'name': portfolio.name,
                        'permission': portfolio.Users_Portfolios.permission
                    }
                });

                // Sort portfolios by ID (could substitute an "order" field
                portfolios.sort((a, b) => { return (a.id < b.id) ? -1 : 1; });

                response.status(200).end(JSON.stringify({'portfolios' : portfolios}, null, 4));
            });
        });
    },
    
    getPortfolioById: function(models, request, response) {
        var userID = request.session.passport.user;
        var portfolioID = request.params['portfolioId'];
        models.User.findById(userID).then(function(user) {
            if (user)
                return user.getPortfolios({where: {id: portfolioID}});
        }).then(function(portfolios) {
            var portfolio = portfolios.find((portfolio) => { return portfolio.id == portfolioID ? true : false });
            if (portfolio === undefined) {
                response.status(401).end('Unauthorized access to portfolio or it does not exist');
            }
            else {
                var portfoliosData = [
                {
                    id: portfolio.id,
                    name: portfolio.name
                }
            ];
            response.end(JSON.stringify(portfoliosData, null, 4)) }
        });
    },

   
}