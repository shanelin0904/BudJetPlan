'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  //至少提供 1個使用者（其中必須包括登入帳號 email: user1, email: user1@example.com, password: 12345678）
  up: async(queryInterface, Sequelize) => {

      await queryInterface.bulkInsert('Users', [{
      name: 'user1name',
      email: 'user1@example.com',
      password: await bcrypt.hash('12345678', 10),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {

   await queryInterface.bulkDelete('Users', null, {});
  }
};
