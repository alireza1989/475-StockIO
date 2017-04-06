module.exports = function(sequelize, DataType) {
    var Company = sequelize.define('Company', {
        name: {
            type: DataType.STRING,
            field: 'name'
        },
        symbol: {
            type: DataType.STRING,
            field: 'symbol',
            unique: true
        },
        stock_exchange: {
            type: DataType.STRING,
            field: 'stock_exchange'
        },
        url: {
            type: DataType.STRING,
            field: 'url',
        },
        ceo: {
            type: DataType.STRING,
            field: 'ceo'
        },
        sector: {
            type: DataType.STRING,
            field: 'sector'
        },
        last_price: {
            type: DataType.STRING,
            field: 'last_price',
        },
        change_price: {
            type: DataType.STRING,
            field: 'change_price',
        },
        change_percent: {
            type: DataType.STRING,
            field: 'change_percent',
        },
        previous_close_price: {
            type: DataType.STRING,
            field: 'previous_close_price',
        },
        dividend: {
            type: DataType.STRING,
            field: 'dividend',
        },
        yield: {
            type: DataType.STRING,
            field: 'yield',
        }

    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Company.belongsToMany(models.Portfolio, {through: 'Companies_Portfolios', timestamps: false});
            }
        }
    });
    return Company;
};
