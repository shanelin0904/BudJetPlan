'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users;',
      { type: queryInterface.sequelize.QueryTypes.SELECT });

    const foodGenre = await queryInterface.sequelize.query(
      'SELECT id FROM Genres WHERE title = "食物";',
      { type: queryInterface.sequelize.QueryTypes.SELECT });

    const foodGenreId = foodGenre[0].id;

    await queryInterface.bulkInsert('Categories', [{
      title: '早餐',
      genre_id: foodGenreId,
      is_default: false,
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      title: '中餐',
      genre_id: foodGenreId,
      is_default: false,
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      title: '晚餐',
      genre_id: foodGenreId,
      is_default: false,
      user_id: users[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {});
  }
};


