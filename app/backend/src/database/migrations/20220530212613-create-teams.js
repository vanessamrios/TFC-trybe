'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const teamsTable = queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      team_name: {
        type: Sequelize.STRING,
        allowNull: true,
        
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
