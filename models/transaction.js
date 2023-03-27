'use strict';
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        name: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        amount: DataTypes.INTEGER,
        type: DataTypes.ENUM
    }, {
        underscored: true, // 將模型的屬性名稱改為底線格式
        timestamps: true
    });
    Transaction.associate = function (models) {
        // associations can be defined here
        Transaction.belongsTo(models.User, { foreignKey: 'UserId' })
    };
    return Transaction;
};