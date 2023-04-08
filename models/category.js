'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: DataTypes.STRING,
    genreId: DataTypes.INTEGER,
    isDefault: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true, // 將模型的屬性名稱改為底線格式
  });
    Category.associate = function (models) {
      // associations can be defined here
      Category.belongsTo(models.User, { foreignKey: 'userId' })
      Category.belongsTo(models.Genre, { foreignKey: 'genreId' })
      Category.hasMany(models.Transaction, { foreignKey: 'categoryId' })
    };
    return Category;
  };