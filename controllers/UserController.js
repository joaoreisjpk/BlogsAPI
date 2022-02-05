const usersServices = require('../services/UserServices');

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
  const { authorization } = req.headers;

  const { code, response } = await usersServices.getUsers(authorization);

  return resp.status(code).json(response);
};

const getUserId = async (req, resp) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const { code, response } = await usersServices.getUserId(authorization, id);

  return resp.status(code).json(response);
};

module.exports = { createUser, getUsers, getUserId };
