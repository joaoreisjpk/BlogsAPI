module.exports = (sequelize, _DataTypes) => {
  const PostsCategories = sequelize.define('PostsCategories',
    {}, { timestamps: false });

  PostsCategories.associate = (models) => {
    PostsCategories.belongsTo(models.Categories, {
      as: 'posts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostsCategories,
    });
    
    PostsCategories.belongsTo(models.BlogPosts, {
      as: 'categories',
      foreignKey: 'postsId',
      otherKey: 'categoryId',
      through: PostsCategories,
    });
  };

  return PostsCategories;
};
