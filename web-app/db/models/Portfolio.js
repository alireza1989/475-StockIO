module.exports = function(sequelize, DataType) {
    var Portfolio = sequelize.define('Portfolio', {
        name: {
            type: DataType.STRING,
            field: 'name',
            allowNull: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Portfolio.belongsToMany(models.User, { through: 'Users_Portfolios', timestamps: false});
                Portfolio.belongsToMany(models.Company, {through: 'Companies_Portfolios', timestamps: false});
            }
        }
    });
    return Portfolio;
};
