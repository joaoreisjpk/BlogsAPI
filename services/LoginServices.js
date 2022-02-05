const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const Login = async ({ email, _password }) => {
  const token = jwt.sign({ data: email }, secret, jwtConfig);
  return { status: 200, response: { token } };
};

module.exports = { Login };
