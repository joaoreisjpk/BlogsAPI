require('dotenv').config();

const categoriesService = require('../services/CategoriesServices');

const createCategory = async (req, resp) => {
  const { name } = req.body;

  const { status, response } = await categoriesService.createCategory(name);

  return resp.status(status).json(response);
};

/* const getUsers = async (req, resp) => {
  const { code, response } = await categoriesService.getUsers();

  return resp.status(code).json(response);
};

const getUserId = async (req, resp) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { code, response } = await categoriesService.getUserId(authorization, id);

  return resp.status(code).json(response);
}; */

module.exports = { createCategory };
