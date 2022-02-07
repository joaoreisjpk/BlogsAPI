require('dotenv').config();
// const { Op } = require('sequelize');
const {
  BlogPosts,
  Users,
  PostsCategories,
  Categories,
} = require('../../models');
const { handleResponse } = require('../helpers');
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
          include: [{ model: Categories, as: 'categories' }],
        },
      ],
    });
    const response = handleResponse(posts);

    return { code: 200, response };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const getPostId = async ({ id }) => {
  try {
    const posts = await BlogPosts.findOne({ where: { id },
      attributes: ['id', 'title', 'content', 'userId', 'published', 'updated'],
      include: [
        { model: Users, as: 'user', attributes: { exclude: ['password'] } },
        {
          model: PostsCategories,
          as: 'categories',
          attributes: { exclude: ['postId'] },
          include: [{ model: Categories, as: 'categories' }],
        }],
    });
    if (!posts) return { code: 404, response: { message: 'Post does not exist' } };
    const response = handleResponse([posts])[0];
    return { code: 200, response };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const updatePost = async ({ id, title, content }) => {
  try {
    await BlogPosts.update({ title, content }, { where: { id } });
    const { response } = await getPostId({ id });
    
    return { code: 200, response };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

module.exports = { createPost, getPosts, getPostId, updatePost };
