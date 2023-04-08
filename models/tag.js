'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING,
    colorCode: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true, // 將模型的屬性名稱改為底線格式
  });
    Tag.associate = function (models) {
      // associations can be defined here
      Tag.belongsTo(models.User, { foreignKey: 'userId' })
      Tag.belongsToMany(models.Transaction, {
        through: models.Transaction2Tag,
        foreignKey: 'tagId'
      })
    };
    return Tag;
  };