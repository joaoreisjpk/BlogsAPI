require('dotenv').config();

const usersServices = require('../services/UserServices');

const createPost = async (req, resp) => {
  const { title, content, categoryIds } = req.body;

  const { status, response } = await usersServices.createUser({
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
