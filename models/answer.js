module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define('Answer', {
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

    Answer.associate = function (models) {
        Answer.belongsTo(models.Question, {
            foreignKey: {
                allowNull: false
            }
        });
        Answer.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Answer;
};
