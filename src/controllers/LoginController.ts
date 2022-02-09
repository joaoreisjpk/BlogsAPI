import { NextFunction, Request, Response } from "express";
import { IServices } from "../interfaces";

import * as loginService from '../services/LoginServices';
import * as Validate from '../helpers/Validations';

const LoginValidation = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
    Validate.Email(email);
    Validate.Password(password);
    next();
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};

const Login = async (req: Request, res: Response): Promise<Response> => {
  const { email }: { email: string } = req.body;

  const { code, response }: IServices = await loginService.Login({ email });

  return res.status(code).json(response);
};

export { Login, LoginValidation };
