module.exports = function (sequelize, DataTypes) {
    var Upvote = sequelize.define('Upvote', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        }

    });

    Upvote.associate = function (models) {
        Upvote.belongsTo(models.Answer, {
            foreignKey: {
                allowNull: false
            }
        });
        Upvote.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Upvote;
};
