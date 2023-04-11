'use strict'
module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        userId: DataTypes.INTEGER,
        vaultId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        date: DataTypes.DATEONLY,
        amount: DataTypes.INTEGER,
        type: DataTypes.ENUM('INCOME', 'EXPENSE'),
        currency: DataTypes.STRING
    }, {
        timestamps: true,
        underscored: true, // 將模型的屬性名稱改為底線格式
    });
    Transaction.associate = function (models) {
        // associations can be defined here
        Transaction.belongsTo(models.User, { foreignKey: 'userId' })
        Transaction.belongsTo(models.Vault, { foreignKey: 'vaultId' })
        Transaction.belongsTo(models.Category, { foreignKey: 'categoryId' })
        Transaction.belongsToMany(models.Tag, {
            through: models.Transaction2tag,
            foreignKey: 'transactionId'
          })
    };
    return Transaction
}
