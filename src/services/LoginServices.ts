const jwt = require('jsonwebtoken');
const { Users } = require('../../models');

const secret = process.env.JWT_SECRET;
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const Login = async ({ email }: {email: string}) => {
  const user = await Users.findOne({ where: { email }, raw: true });

  if (!user) return { status: 400, response: { message: 'Invalid fields' } };

  const token = jwt.sign({ data: email }, secret, jwtConfig);

  return { status: 200, response: { token } };
};

module.exports = { Login };
