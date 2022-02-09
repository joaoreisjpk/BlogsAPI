import { NextFunction, Request, Response } from "express";

import 'dotenv/config'
import * as Validate from '../helpers/Validations';

import * as usersServices from '../services/UserServices';

const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { displayName, email, password } = req.body;

  try {
    Validate.DisplayName(displayName);
    Validate.Email(email);
    Validate.Password(password);
    next();
  } catch ({ message }) {
    return res.status(400).json({ message });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { displayName, email, password, image } = req.body;

  const { status, response } = await usersServices.createUser({
    displayName,
    email,
    password,
    image,
  });

  return res.status(status).json(response);
};

const getUsers = async (req: Request, res: Response) => {
  const { code, response } = await usersServices.getUsers();
  return res.status(code).json(response);
};

const getUserId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { code, response } = await usersServices.getSpecificUser({ id });

  return res.status(code).json(response);
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body.user;

  const { code, response } = await usersServices.deleteUser({ id });

  return res.status(code).json(response);
};

export {
  createUser,
  getUsers,
  getUserId,
  deleteUser,
  validateUser,
};
