'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction2Tag = sequelize.define('Transaction2Tag', {
    transactionId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true, // 將模型的屬性名稱改為底線格式
  });
  Transaction2Tag.associate = function (models) {
    // associations can be defined here
    Transaction2Tag.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
    Transaction2Tag.belongsTo(models.Tag, { foreignKey: 'tagId' })
   };
  return Transaction2Tag;
};