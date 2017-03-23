module.exports = function(sequelize, DataType) {
    var Invitation = sequelize.define('Invitation', {
        senderID: {
            type: DataType.INTEGER,
            field: 'senderId'
        },
        receiverId: {
            type: DataType.INTEGER,
            field: 'receiverId'
        },
        accepted: {
            type: DataType.BOOLEAN,
            field: 'accepted'
        }
    }, {
        timestamps: false,
        classMethods: {
            associate: function(models) {
            }
        }
    });
    return Portfolio;
};
