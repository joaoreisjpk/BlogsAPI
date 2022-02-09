export default {
  up: async (queryInterface: any, _Sequelize: any) => {
    await queryInterface.bulkInsert('PostsCategories',
      [
        {
          postId: 1,
          categoryId: 1,
        },
        {
          postId: 2,
          categoryId: 2,
        },

      ], { timestamps: false });
  },

  down: async (queryInterface: any, _Sequelize: any) => {
    await queryInterface.bulkDelete('PostsCategories', null, {});
  },
};
