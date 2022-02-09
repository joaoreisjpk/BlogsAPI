export default {
  up: async (queryInterface: any, _Sequelize: any) => {
    await queryInterface.bulkInsert('Categories',
      [
        {
          id: 1,
          name: 'Inovação',
        },
        {
          id: 2,
          name: 'Escola',
        },
      ], { timestamps: false });
  },

  down: async (queryInterface: any, _Sequelize: any) => {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
