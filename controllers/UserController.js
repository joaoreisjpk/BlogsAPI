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

  console.log(authorization);

  const { code, response } = usersServices.getUsers(authorization);

  return resp.status(code).json(response);
};

module.exports = { createUser, getUsers };
