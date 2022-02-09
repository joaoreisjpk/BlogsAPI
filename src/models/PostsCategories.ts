import { DataType, Sequelize } from "sequelize/types";

export default (sequelize: any, _DataTypes: DataType) => {
  const PostsCategories = sequelize.define('PostsCategories', {},
    { timestamps: false });

  PostsCategories.associate = (models: any) => {
    models.Categories.belongsToMany(models.BlogPosts, {
      as: 'posts',
      through: PostsCategories,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPosts.belongsToMany(models.Categories, {
      as: 'categories',
      through: PostsCategories,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostsCategories;
};
