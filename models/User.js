module.exports = function(sequelize, DataType) {
    var User = sequelize.define('User', {
        firstname: {
            type: DataType.STRING,
            field: 'firstname'
        },
        lastname: {
            type: DataType.STRING,
            field: 'lastname'
        },
        email: {
            type: DataType.STRING,
            field: 'email'
        },
        password: {
            type: DataType.STRING,
            field: 'password'
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return User;
};
