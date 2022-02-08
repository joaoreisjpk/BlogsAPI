require('dotenv').config();

const categoriesService = require('../services/CategoriesServices');

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { status, response } = await categoriesService.createCategory(name);

  return res.status(status).json(response);
};

const getCategories = async (req, res) => {
  const { code, response } = await categoriesService.getCategories();

  return res.status(code).json(response);
};

module.exports = { createCategory, getCategories };
