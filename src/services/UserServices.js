require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const tokenValidation = async (token) => {
  if (!token) return { code: 401, response: { message: 'Token not found' } };

  const { data } = jwt.verify(token, secret);

  const user = await Users.findOne({ where: { email: data }, raw: true });

  if (!user) {
    return { code: 401, response: { message: 'Expirid or invalid token' } };
  }

  return { user };
};

const createUser = async ({ displayName, email, password, image }) => {
  try {
    await Users.create({ displayName, email, password, image });

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return { status: 201, response: { token } };
  } catch (err) {
    return { status: 409, response: { message: 'User already registered' } };
  }
};

const getUsers = async () => {
  try {
    const users = await Users.findAll();
    return { code: 200, response: users };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const getSpecificUser = async (data) => {
  const users = await Users.findOne({ where: data, raw: true });

  if (!users) {
    return { code: 404, response: { message: 'User does not exist' } };
  }
  return { code: 200, response: users };
};

const deleteUser = async ({ id }) => {
  try {
    await Users.destroy({ where: { id } });

    return { code: 204 };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

module.exports = {
  createUser,
  getUsers,
  getSpecificUser,
  tokenValidation,
  deleteUser,
};
