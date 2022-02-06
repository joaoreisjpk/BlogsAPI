require('dotenv').config();

const postsServices = require('../services/PostsServices');

const createPost = async (req, resp) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const { status, response } = await postsServices.createPost({
    id,
    title,
    content,
    categoryIds,
  });

  return resp.status(status).json(response);
};
/* 
const getUsers = async (req, resp) => {
  const { code, response } = await usersServices.getUsers();

  return resp.status(code).json(response);
};

const getUserId = async (req, resp) => {
  const { id } = req.params;

  const { code, response } = await usersServices.getUserId({ id });

  return resp.status(code).json(response);
}; */

module.exports = { createPost };
