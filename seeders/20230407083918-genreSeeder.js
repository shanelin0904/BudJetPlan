'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Genres', [
      { title: '食物', color_code: '#e74c3c', created_at: new Date(), updated_at: new Date() },
      { title: '消費', color_code: '#8e44ad', created_at: new Date(), updated_at: new Date() },
      { title: '居家', color_code: '#f39c12', created_at: new Date(), updated_at: new Date() },
      { title: '交通', color_code: '#2980b9', created_at: new Date(), updated_at: new Date() },
      { title: '學習', color_code: '#27ae60', created_at: new Date(), updated_at: new Date() },
      { title: '娛樂', color_code: '#9b59b6', created_at: new Date(), updated_at: new Date() },
      { title: '醫藥', color_code: '#2c3e50', created_at: new Date(), updated_at: new Date() },
      { title: '飲品', color_code: '#f1c40f', created_at: new Date(), updated_at: new Date() },
      { title: '3C', color_code: '#3498db', created_at: new Date(), updated_at: new Date() },
      { title: '其他', color_code: '#bdc3c7', created_at: new Date(), updated_at: new Date() },
      { title: '收入', color_code: '#2ecc71', created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
