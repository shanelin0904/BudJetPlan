'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction2tag = sequelize.define('Transaction2tag', {
    transactionId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    timestamps: true,
    underscored: true, // 將模型的屬性名稱改為底線格式
  });
  Transaction2tag.associate = function (models) {
    // associations can be defined here
    Transaction2tag.belongsTo(models.Transaction, { foreignKey: 'transactionId' });
    Transaction2tag.belongsTo(models.Tag, { foreignKey: 'tagId' })
   };
  return Transaction2tag;
};