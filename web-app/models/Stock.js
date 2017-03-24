module.exports = function(sequelize, DataType) {
    var Stock = sequelize.define('Stock', {
        name: {
            type: DataType.STRING,
            field: 'name'
        },
        symbol: {
            type: DataType.STRING,
            field: 'symbol'
        },
        stock_exchange: {
            type: DataType.STRING,
            field: 'stock_exchange'
        },
        url: {
            type: DataType.STRING,
            field: 'url'
        },
        ceo: {
            type: DataType.STRING,
            field: 'ceo'
        },
        sector: {
            type: DataType.STRING,
            field: 'sector'
        },
        lastprice: {
            type: DataType.FLOAT,
            field: 'last_price'
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Stock;
};
