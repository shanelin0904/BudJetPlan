'use strict';

const faker = require('faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT });
    
      const randomCategory = await queryInterface.sequelize.query(
      'SELECT id FROM Categories ORDER BY RAND() LIMIT 1;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    await queryInterface.bulkInsert('Transactions', [{
      name: faker.commerce.productName(),
      date: faker.date.past(),
      amount: faker.finance.amount(10, 1000, 0),
      type: faker.random.arrayElement(['INCOME', 'EXPENSE']),
      currency: faker.finance.currencyCode(),
      user_id: users[0].id,
      category_id: randomCategory[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, {});
  }
};

