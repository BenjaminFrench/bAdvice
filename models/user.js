module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        username: {
            type: DataTypes.TEXT,
            notEmpty: true
        },

        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            } 
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        last_login: {
            type: DataTypes.DATE
        },

        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Question, {
            onDelete: "cascade"
        });
        User.hasMany(models.Answer, {
            onDelete: "cascade"
        });
    };

    return User;
};
