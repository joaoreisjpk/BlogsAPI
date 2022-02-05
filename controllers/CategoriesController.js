require('dotenv').config();

const usersServices = require('../services/UserServices');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const isNotValid = await usersServices.Token(authorization);

    if (!isNotValid) return res.status(isNotValid.code).json(isNotValid.response);
    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expirid or invalid token' });
  }
};

const createCategory = async (req, resp) => {
  const { name } = req.body;

  const { status, response } = await usersServices.createUser({
    name,
  });

  return resp.status(status).json(response);
};

/* const getUsers = async (req, resp) => {
  const { code, response } = await usersServices.getUsers();

  return resp.status(code).json(response);
};

const getUserId = async (req, resp) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { code, response } = await usersServices.getUserId(authorization, id);

  return resp.status(code).json(response);
}; */

module.exports = { createCategory, tokenValidation };
