'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vault = sequelize.define('Vault', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    currency: DataTypes.STRING
  }, {
    underscored: true, // 將模型的屬性名稱改為底線格式
    timestamps: true
  });
  Vault.associate = function (models) {
    // associations can be defined here
    Vault.belongsTo(models.User, { foreignKey: 'userId' })
    Vault.hasMany(models.Transaction, { foreignKey: 'vaultId' })
  };
  return Vault;
};