const jwt = require('jsonwebtoken');
const usersServices = require('../services/UserServices');

const secret = process.env.JWT_SECRET;

const tokenValidation = async (req, res, next) => {
  const { authorization: token } = req.headers;

  try {
    if (!token) return res.status(401).json({ message: 'Token not found' });

    const { data: email } = jwt.verify(token, secret);

    const { response: user } = usersServices.getSpecificUser({ email });

    if (user.code === 404) {
      return res.status(401).json({ message: 'Expirid or invalid token' });
    }

    req.user = user;
    next();
  } catch ({ message }) {
    if (message === 'jwt malformed') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return res.status(401).json({ message });
  }
};

module.exports = { tokenValidation };