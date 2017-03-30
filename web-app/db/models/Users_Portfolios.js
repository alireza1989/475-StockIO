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
            type: DataType.ENUM('admin', 'write', 'read'),
            field: 'Permission',
            allowNull: false
            // validate: {
            //     isIn: [['admin', 'write', 'read']]
            // }
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
