'use strict';
module.exports = (sequelize, DataTypes) => {
    const Reminder = sequelize.define('Reminder', {
        title: DataTypes.STRING,
        dueDate: DataTypes.DATEONLY,
        note: DataTypes.STRING,
        isCompleted: DataTypes.BOOLEAN
    }, {
        underscored: true, // 將模型的屬性名稱改為底線格式
        timestamps: true
    });
    Reminder.associate = function (models) {
        // associations can be defined here
        Reminder.belongsTo(models.User, { foreignKey: 'UserId' })
    };
    return Reminder;
};