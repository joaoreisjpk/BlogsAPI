// models/Category.js
// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'Categories',
      underscored: true,
    },
  );

  Category.associate = (models) => {
    Category.hasMany(models.PostsCategories, {
      foreignKey: 'category_id',
      as: 'posts',
    });
  };

  return Category;
};
