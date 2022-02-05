require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const Validate = require('../helpers/Validations');

const secret = process.env.JWT_SECRET;

const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const createUser = async ({ displayName, email, password, image }) => {
  try {
    Validate.DisplayName(displayName);
    Validate.Email(email);
    Validate.Password(password);

    try {
      await Users.create({ displayName, email, password, image });
    } catch (err) {
      return { status: 409, response: { message: 'User already registered' } };
    }

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return { status: 201, response: { token } };
  } catch ({ message }) {
    return { status: 400, response: { message } };
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
  const users = await Users.findOne({ where: { data } });

  if (!users) {
    return { code: 404, response: { message: 'User does not exist' } };
  }

  return { code: 200, response: users };
};

const Token = async (token) => {
  if (!token) return { code: 401, response: { message: 'Token not found' } };

  const { data } = jwt.verify(token, secret);
  const user = await getSpecificUser(data);

  if (user.code !== 200) return { code: 401, response: { message: 'Expirid or invalid token' } };
};

module.exports = { createUser, getUsers, getSpecificUser, Token };
