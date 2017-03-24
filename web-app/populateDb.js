const fs = require('fs');
const models = require('./models');

models.sequelize.sync({force: true}).then(function() {
    fs.readFile('./companies.json', function(err, data) {
        var stocks = JSON.parse(data).company;

        stocks.forEach(function(stock) {
            models.Stock.create({
                name: stock.name,
                symbol: stock.symbol,
                description: stock.description,
                stock_exchange: stock.stock_exchange,
                url: stock.url,
                ceo: stock.ceo
            });
        });
    });
});
