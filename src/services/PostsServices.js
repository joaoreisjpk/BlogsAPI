require('dotenv').config();
// const { Op } = require('sequelize');
const {
  BlogPosts,
  Users,
  PostsCategories,
  Categories,
} = require('../../models');
const Validate = require('../helpers/Validations');

const createPost = async ({ id: userId, title, content, categoryIds }) => {
  try {
    Validate.Title(title);
    Validate.Content(content);
    await Validate.CategoryIds(categoryIds);

    const post = await BlogPosts.create({
      userId,
      title,
      content,
      categoryIds,
    });

    await PostsCategories.bulkCreate(
      categoryIds.map((categoryId) => ({ categoryId, postId: post.id })),
    );

    const data = { id: post.id, userId, title, content };

    return { status: 201, response: data };
  } catch ({ message }) {
    return { status: 400, response: { message } };
  }
};
const getPosts = async () => {
  try {
    const posts = await BlogPosts.findAll({
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
        {
          model: PostsCategories,
          as: 'categories',
          attributes: { exclude: ['postId'] },
        },
      ],
    });
    console.log(posts);
    return { code: 200, response: posts };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const getPostId = async ({ id }) => {
  try {
    const post = await BlogPosts.findOne({
      where: { id },
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [{
          model: Users, as: 'user', attributes: { exclude: ['password'] }, raw: true,
        }],
    });

    const postCategories = await PostsCategories.findAll({
      where: { postId: id },
      include: { model: Categories, as: 'categories', raw: true },
    });

    const categories = await postCategories.map((item) => item.categories);

    const response = { ...JSON.parse(JSON.stringify(post)), categories };

    return { code: 200, response };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

module.exports = { createPost, getPosts, getPostId };
