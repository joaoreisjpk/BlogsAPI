require('dotenv').config();

const usersServices = require('../services/UserServices');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const isNotValid = await usersServices.tokenValidation(authorization);

    if (isNotValid.code) { return res.status(isNotValid.code).json(isNotValid.response); }

    req.user = isNotValid.user;

    next();
  } catch ({ message }) {
    if (message === 'jwt malformed') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return res.status(401).json({ message });
  }
};

const createUser = async (req, resp) => {
  const { displayName, email, password, image } = req.body;

  const { status, response } = await usersServices.createUser({
    displayName,
    email,
    password,
    image,
  });

  return resp.status(status).json(response);
};

const getUsers = async (req, resp) => {
  const { code, response } = await usersServices.getUsers();

  return resp.status(code).json(response);
};

const getUserId = async (req, resp) => {
  const { id } = req.params;

  const { code, response } = await usersServices.getSpecificUser({ id });

  return resp.status(code).json(response);
};

module.exports = { createUser, getUsers, getUserId, tokenValidation };
