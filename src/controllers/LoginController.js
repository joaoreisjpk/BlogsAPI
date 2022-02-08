const loginService = require('../services/LoginServices');
const Validate = require('../helpers/Validations');

const LoginValidation = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    Validate.Email(email);
    Validate.Password(password);
    next();
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};

const Login = async (req, res) => {
    const { email, password } = req.body;

    const { status, response } = await loginService.Login({ email, password });

    return res.status(status).json(response);
};

module.exports = { Login, LoginValidation };
