require('dotenv').config();
const Validate = require('../helpers/Validations');

const usersServices = require('../services/UserServices');

const validateUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  
  try {
    Validate.DisplayName(displayName);
    Validate.Email(email);
    Validate.Password(password);
    next();
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const { status, response } = await usersServices.createUser({
    displayName,
    email,
    password,
    image,
  });

  return res.status(status).json(response);
};

const getUsers = async (req, res) => {
  const { code, response } = await usersServices.getUsers();
  return res.status(code).json(response);
};

const getUserId = async (req, res) => {
  const { id } = req.params;

  const { code, response } = await usersServices.getSpecificUser({ id });

  return res.status(code).json(response);
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  const { code, response } = await usersServices.deleteUser({ id });

  return res.status(code).json(response);
};

module.exports = {
  createUser,
  getUsers,
  getUserId,
  deleteUser,
  validateUser,
};
