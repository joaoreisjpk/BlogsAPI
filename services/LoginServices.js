const jwt = require('jsonwebtoken');
const Validate = require('../helpers/Validations');
const { Users } = require('../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const Login = async ({ email, password }) => {
  try {
    Validate.Email(email);
    Validate.Password(password);

    const user = await Users.findOne({ where: { email }, raw: true });
    console.log(user);
    if (!user) throw Error('Invalid fields');

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return { status: 200, response: { token } };
  } catch ({ message }) {
    return { status: 400, response: { message } };
  }
};

module.exports = { Login };
