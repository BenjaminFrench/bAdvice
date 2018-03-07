module.exports = function (sequelize, DataTypes) {
    var Question = sequelize.define('Question', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        title: {
            type: DataTypes.TEXT,
            notEmpty: true
        },

        text: {
            type: DataTypes.STRING,
        }
    });

    Question.associate = function (models) {
        Question.hasMany(models.Answer, {
            onDelete: "cascade"
        });
        
        Question.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Question;
};
