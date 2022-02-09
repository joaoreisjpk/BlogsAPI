import { NextFunction, Request, Response } from "express";

const loginService = require('../services/LoginServices');
const Validate = require('../helpers/Validations');

const LoginValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    Validate.Email(email);
    Validate.Password(password);
    next();
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};

const Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { status, response } = await loginService.Login({ email, password });

    return res.status(status).json(response);
};

export default { Login, LoginValidation };
