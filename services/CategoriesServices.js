require('dotenv').config();
const { Categories } = require('../models');

const createCategory = async (name) => {
  if (!name) {
    return { status: 400, response: { message: '"name" is required' } };
  }

  try {
    const category = await Categories.create({ name });
    console.log(category.dataValues);
    return { status: 400, response: category.dataValues };
  } catch (err) {
    return { status: 409, response: { message: 'User already registered' } };
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
  const users = await Users.findOne({ where: { data } });

  if (!users) {
    return { code: 404, response: { message: 'User does not exist' } };
  }

  return { code: 200, response: users };
}; */
module.exports = { createCategory };
