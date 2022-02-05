'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("BlogPosts", {
    });
  },
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable("BlogPosts");
  }
};