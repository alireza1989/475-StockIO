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
            type: DataType.DECIMAL,
            field: 'last_price',
            allowNull: false
        },
        change_price: {
            type: DataType.DECIMAL,
            field: 'change_price',
            allowNull: false
        },
        change_percent: {
            type: DataType.DECIMAL,
            field: 'change_percent',
            allowNull: false
        },

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
