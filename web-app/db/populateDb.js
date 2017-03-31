const fs = require('fs');
const models = require('./models');

models.sequelize.sync({force: true}).then(function() {
    fs.readFile('./companies.json', function(err, data) {
        var stocks = JSON.parse(data).company;

        stocks.forEach(function(stock) {
            models.Company.create({
                name: stock.name,
                symbol: stock.symbol,
                stock_exchange: stock.exchange,
                url: stock.url,
                ceo: stock.ceo,
                sector: stock.sector,
                last_price: 0.00,
                change_price: 0.00,
                change_percent: 0.00,
                previous_close_price: 0.00,
                dividend: 0.00,
                yield: 0.00
            });
        });
    });

    fs.readFile('./news.json', function(err, data) {
        var news = JSON.parse(data).data;

        news.forEach(function(article) {
            models.News.create({
                company: "Apple",
                title: article.title,
                publication_date: article.publication_date,
                url: article.url,
                summary: article.summary
            });
        });
    });

    fs.readFile('./users.json', function(err, data) {
        var users = JSON.parse(data).users;

        users.forEach(function(user) {
            models.User.create({
                firstname: user.firstname,
                lastname: user.lastname,
                username: user.username,
                password: user.password
            });
        });
    });

    fs.readFile('./portfolios.json', function(err, data) {
        var portfolios = JSON.parse(data).portfolios;

        portfolios.forEach(function(portfolio) {
            models.Portfolio.create({
                name: portfolio.name
            }).then(function(portfolioDb) {
                portfolioDb.addCompanies(portfolio.companies);
                portfolioDb.addUsers(portfolio.users, {permission: 'admin'});
            })
        });
    });



});
