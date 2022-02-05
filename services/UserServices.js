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

module.exports = { createUser };
