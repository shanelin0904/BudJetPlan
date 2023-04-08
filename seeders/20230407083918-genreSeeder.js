'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genres', [
      { title: '食物', colorCode: '#e74c3c', createdAt: new Date(), updatedAt: new Date() },
      { title: '消費', colorCode: '#8e44ad', createdAt: new Date(), updatedAt: new Date() },
      { title: '居家', colorCode: '#f39c12', createdAt: new Date(), updatedAt: new Date() },
      { title: '交通', colorCode: '#2980b9', createdAt: new Date(), updatedAt: new Date() },
      { title: '學習', colorCode: '#27ae60', createdAt: new Date(), updatedAt: new Date() },
      { title: '娛樂', colorCode: '#9b59b6', createdAt: new Date(), updatedAt: new Date() },
      { title: '醫藥', colorCode: '#2c3e50', createdAt: new Date(), updatedAt: new Date() },
      { title: '飲品', colorCode: '#f1c40f', createdAt: new Date(), updatedAt: new Date() },
      { title: '3C', colorCode: '#3498db', createdAt: new Date(), updatedAt: new Date() },
      { title: '其他', colorCode: '#bdc3c7', createdAt: new Date(), updatedAt: new Date() },
      { title: '收入', colorCode: '#2ecc71', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
