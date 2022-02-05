require('dotenv').config();
const { BlogPosts } = require('../models');
const Validate = require('../helpers/Validations');

const createPost = async ({ title, content, categoryIds }) => {
  try {
    Validate.Title(title);
    Validate.Content(content);
    Validate.CategoryIds(categoryIds);

    const post = await BlogPosts.create({ title, content, categoryIds });

    return { status: 201, response: post.dataValues };
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
