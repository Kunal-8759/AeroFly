'use strict';

//@type {import('sequelize-cli').Migration} */

const { Op } = require('@sequelize/core');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Airplanes',[
      {
        ModelNo:'airbus-b22',
        capacity:111,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo:'airbus-b11',
        capacity:222,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ModelNo:'airbus-c11',
        capacity:1200,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Airplanes', {[Op.or]:[{ModelNo:'airbus-b22'},{ModelNo:'null'}]});
  }
};
