'use strict';
module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    startDate: DataTypes.DATEONLY,
    endDate: DataTypes.DATEONLY
  }, {
    underscored: true, // 將模型的屬性名稱改為底線格式
    timestamps: true
  });
  Budget.associate = function(models) {
    // associations can be defined here
    Budget.belongsTo(models.User, { foreignKey: 'UserId' })
  };
  return Budget;
};