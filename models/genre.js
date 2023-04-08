'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    title: DataTypes.STRING,
    colorCode: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true, // 將模型的屬性名稱改為底線格式
  });
  Genre.associate = function (models) {
    // associations can be defined here
    Genre.hasMany(models.Category, { foreignKey: 'genreId' })
  };
  return Genre;
};