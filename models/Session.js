module.exports = function(sequelize, DataType) {
    var Session = sequelize.define('Session', {
        sessionKey: {
            type: DataType.STRING,
            field: 'sessionKey'
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Session.belongsTo(models.User, {foreignKey: 'sessionUser', timestamps: false});
            }
        }
    });
    return Session;
};