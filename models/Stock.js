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
        description: {
            type: DataType.STRING(2000),
            field: 'description'
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
