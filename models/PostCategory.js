// models/PostCategorie.js
// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, _DataTypes) => {
  const PostCategorie = sequelize.define(
    'PostCategory',
    {},
    {
      timestamps: false,
      tableName: 'PostsCategories',
      underscored: true,
    },
  );

  PostCategorie.associate = (models) => {
    PostCategorie.belongsTo(models.Categories, {
      foreignKey: 'category_id',
      as: 'categoriesId',
    });
    PostCategorie.belongsTo(models.BlogPosts, {
      foreignKey: 'category_id',
      as: 'postsId',
    });
  };

  return PostCategorie;
};
