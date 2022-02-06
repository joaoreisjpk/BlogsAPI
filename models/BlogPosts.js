module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    updatedAt: { type: DataTypes.DATE, field: 'updated' },    
    createdAt: { type: DataTypes.DATE, field: 'published' },
    userId: DataTypes.INTEGER,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });

    BlogPosts.hasMany(models.PostsCategories, {
      foreignKey: 'postId',
      as: 'posts',
    });
  };
  return BlogPosts;
};
