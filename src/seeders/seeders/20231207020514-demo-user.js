'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('User', [
      {
        email: 'abc@gmail.com',
        password: 'abc',
        username: 'abc'
      }, {
        email: 'bac@gmail.com',
        password: 'bac',
        username: 'bac'
      }, {
        email: 'cab@gmail.com',
        password: 'cab',
        username: 'cab'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
