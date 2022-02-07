module.exports = (sequelize, DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories', {
      categoryId: { type: DataTypes.INTEGER, primaryKey: true },
      postId: { type: DataTypes.INTEGER, primaryKey: true },
    }, { timestamps: false });

  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(models.Categories, {
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    PostsCategories.belongsTo(models.BlogPosts, {
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};
