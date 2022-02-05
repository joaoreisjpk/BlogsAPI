require('dotenv').config();
const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const createUser = async ({ displayName, email, password, image }) => {
  await Users.create({ displayName, email, password, image });

  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return { status: 201, response: { token } };
};

module.exports = { createUser };
