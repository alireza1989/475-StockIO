var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataType) {
    var User = sequelize.define('User', {
        firstname: {
            type: DataType.STRING,
            field: 'firstname',
            allowNull: false
        },
        lastname: {
            type: DataType.STRING,
            field: 'lastname',
            allowNull: false
        },
        username: {
            type: DataType.STRING,
            field: 'username',
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataType.STRING,
            field: 'password',
            allowNull: false
        }
    }, {
        timestamps: false,
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
        },
        classMethods: {
            hashPassword: function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
            },
            associate: function(models) {
                User.belongsToMany(models.Portfolio, {through: 'Users_Portfolios', timestamps: false});  
                User.hasMany(models.Invitation, {as: 'Invitations'});     
                User.belongsToMany(models.Session, { through: 'Users_Sessions', foreignKeyConstraint: true });  
            }
        }
    });
    return User;
};
