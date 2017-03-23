module.exports = function(sequelize, DataType) {
    var Portfolio = sequelize.define('Portfolio', {
        name: {
            type: DataType.STRING,
            field: 'name'
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Portfolio.belongsToMany(models.Stock, { as: 'song_id', through: 'stocks_portfolio', foreignKey: 'portfolio_id', timestamps: false})
            }
        }
    });
    return Portfolio;
};
