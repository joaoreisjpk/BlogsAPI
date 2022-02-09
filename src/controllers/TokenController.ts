import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as usersServices from '../services/UserServices';

const secret = process.env.JWT_SECRET || '';

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization: token } = req.headers;

  try {
    if (!token) {
      res.status(401).json({ message: 'Token not found' })
      return;
    };

    const { data: email }: any = jwt.verify(token, secret);

    const { response: user, code } = await usersServices.getSpecificUser({ email });
    console.log(code);
    if (code === 404) {
      res.status(401).json({ message: 'Expirid or invalid token' });
      return;
    }
    console.log(user);

    req.body.user = user;
    next();
  } catch ({ message }) {
    if (message === 'jwt malformed') {
      res.status(401).json({ message: 'Expired or invalid token' });
      return;
    }
    res.status(401).json({ message });
  }
};

export { tokenValidation };
