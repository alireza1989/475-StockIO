module.exports = function(sequelize, DataType) {
    var Users_Portfolios = sequelize.define('Users_Portfolios', {
        PortfolioId: {
            type: DataType.INTEGER,
            field: 'PortfolioId',
            allowNull: false
        },
        UserId: {
            type: DataType.INTEGER,
            field: 'UserId',
            allowNull: false
        },
        Permission: {
            type: DataType.STRING,
            field: 'Permission',
            allowNull: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
            }
        }
    });
    Users_Portfolios.removeAttribute('id');
    return Users_Portfolios;
};
