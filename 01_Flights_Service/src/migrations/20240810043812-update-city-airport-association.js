'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    //Airports.cityId = Cities.id are connected through foreign key constraints
    await queryInterface.addConstraint('Airports',{
      fields:['cityId'],
      type:'foreign key',
      name:'city-fkey-constraint',
      references:{
        table:'cities',
        field:'id'
      },
      onDelete:'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Airports','city-fkey-constraint')
  }
};
