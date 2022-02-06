require('dotenv').config();
// const { Op } = require('sequelize');
const { BlogPosts } = require('../models');
const Validate = require('../helpers/Validations');

const createPost = async ({ id: userId, title, content, categoryIds }) => {
  try {
    Validate.Title(title);
    Validate.Content(content);
    await Validate.CategoryIds(categoryIds);

    const post = await BlogPosts.create({ userId, title, content, categoryIds });

    const data = { id: post.id, userId, title, content };

    return { status: 201, response: data };
  } catch ({ message }) {
    return { status: 400, response: { message } };
  }
};
/* const getUsers = async () => {
  try {
    const users = await Users.findAll();
    return { code: 200, response: users };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const getSpecificUser = async (data) => {
  const users = await Users.findOne({ where: data, raw: true });
  if (!users) {
    return { code: 404, response: { message: 'User does not exist' } };
  }

  return { code: 200, response: users };
};
 */
module.exports = { createPost };
