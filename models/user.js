'use strict'
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        underscored: true, // 將模型的屬性名稱改為底線格式
        timestamps: true
    });
    User.associate = function (models) {
        // 和Transaction的關聯
        User.hasMany(models.Transaction, { foreignKey: 'userId' })
    }
    return User
}

