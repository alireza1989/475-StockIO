module.exports = function(sequelize, DataType) {
    var Users_Portfolios = sequelize.define('Users_Portfolios', {
        permission: {
            type: DataType.STRING,
            field: 'permission',
            allowNull: false,
            validate: {
                isIn: [['admin', 'write', 'read']]
            }
        }
    }, {
        timestamps: false,
    });
    
    return Users_Portfolios;
};