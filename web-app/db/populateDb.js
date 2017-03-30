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
                change_percent: 0.00
            });
        });
    });

    fs.readFile('./news.json', function(err, data) {
        var news = JSON.parse(data).data;

        news.forEach(function(article) {
            models.News.create({
                title: article.title,
                publication_date: article.publication_date,
                url: article.url,
                summary: article.summary
            });
        });
    });
});
