module.exports = function(sequelize, DataType) {
    var Session = sequelize.define('Session', {
        sid: {
            type: DataType.STRING,
            primaryKey: true
        },
        expires: {
            type: DataType.DATE,
            allowNull: true
        },
        data: DataType.TEXT
    }, {
        timestamps: false
    });
    
    return Session;
};