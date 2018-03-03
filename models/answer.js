module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define('Answer', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        text: {
            type: DataTypes.STRING,
            notEmpty: true
        },

        upvotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            notEmpty: true
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
