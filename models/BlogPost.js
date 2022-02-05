// models/Post.js
// eslint-disable-next-line max-lines-per-function
module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: DataTypes.STRING,
      updated: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'BlogPosts',
      underscored: true,
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'user_id', as: 'users' });
    BlogPost.hasMany(models.PostsCategories, {
      foreignKey: 'post_id',
      as: 'categories',
    });
  };

  return BlogPost;
};
