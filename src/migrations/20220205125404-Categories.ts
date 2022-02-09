'use strict';

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    });
  },
  down: async (queryInterface: any, _Sequelize: any) => {
    return queryInterface.dropTable("Categories");
  }
};