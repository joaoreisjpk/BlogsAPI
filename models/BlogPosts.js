module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.STRING,
      updated: DataTypes.STRING,
    },
    { timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, { foreignKey: 'userId', as: 'users' });
    
    BlogPosts.hasMany(models.PostsCategories, {
      foreignKey: 'postId',
      as: 'categories',
    });
  };
  return BlogPosts;
};
