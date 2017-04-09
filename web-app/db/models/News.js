module.exports = function(sequelize, DataType) {
    var News = sequelize.define('News', {
        company: {
            type: DataType.STRING,
            field: 'company'
        },
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
            type: DataType.STRING(1024),
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
