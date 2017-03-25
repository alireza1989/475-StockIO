module.exports = function(sequelize, DataType) {
    var Invitation = sequelize.define('Invitation', {
        senderId: {
            type: DataType.INTEGER,
            field: 'senderId',
            primaryKey: true,
            allowNull: false
        },
        receiverId: {
            type: DataType.INTEGER,
            field: 'receiverId',
            primaryKey: true,
            allowNull: false
        },
        portfolioId: {
            type: DataType.INTEGER,
            field: 'portfolioId',
            primaryKey: true,
            allowNull: false
        },
        accepted: {
            type: DataType.BOOLEAN,
            field: 'accepted',
            primaryKey: true,
            allowNull: false
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
                Invitation.belongsTo(models.User, {foreignKey: 'receiverId', timestamps: false});
                Invitation.belongsTo(models.Portfolio, {foreignKey: 'portfolioId', timestamps: false});
            }
        }
    });
    return Invitation;
};
