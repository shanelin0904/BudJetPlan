'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: DataTypes.STRING
    }, {
        underscored: true, // 將模型的屬性名稱改為底線格式
        timestamps: true
    });
    Category.associate = function (models) {
        // 和Transaction的關聯
        User.hasMany(models.Transaction, { foreignKey: 'CategoryId' })
        // 和Budget的關聯
        User.hasMany(models.Budget, { foreignKey: 'CategoryId' })
    };
    return Category;
};