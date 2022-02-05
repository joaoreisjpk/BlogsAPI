const loginService = require('../services/LoginServices');

const Login = async (req, resp) => {
  const { email, password } = req.body;

  const { status, response } = await loginService.loginUser(email, password);

  return resp.status(status).json(response);
};

module.exports = { Login };