module.exports = function(sequelize, DataType) {
    var News = sequelize.define('News', {
        title: {
            type: DataType.STRING,
            field: 'title'
        },
        publication_date: {
            type: DataType.DATE,
            field: 'publication_date'
        },
        url: {
            type: DataType.STRING,
            field: 'url'
        },
        summary: {
            type: DataType.STRING,
            field: 'summary'
        }
    },{
        timestamps: false,
        classMethods: {
            associate: function(models) {
            }
        }
    });

    return News;
};
