'use strict';

export default {
  up: async (queryInterface: any, Sequelize: any) => {
    return queryInterface.createTable('PostsCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'BlogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Categories',
          key: 'id',
        }
      }
    });
  },
  down: async (queryInterface: any, _Sequelize: any) => {
    return queryInterface.dropTable('PostsCategories');
  },
};
