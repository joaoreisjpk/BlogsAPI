import { NextFunction, Request, Response } from "express";
import { ReqPlusUser } from "../interfaces";

require('dotenv').config();
const Validate = require('../helpers/Validations');

const usersServices = require('../services/UserServices');

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

const deleteUser = async (req: ReqPlusUser, res: Response) => {
  const { id } = req.user;

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
