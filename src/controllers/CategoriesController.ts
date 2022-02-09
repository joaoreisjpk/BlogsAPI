import { Request, Response } from "express";
import 'dotenv/config';

import * as services from '../services/CategoriesServices';
import { IServices } from "../interfaces";

const createCategory = async (req: Request, res: Response): Promise<Response> => {
  const { name }: { name: string} = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { code, response }: IServices = await services.createCategory(name);

  return res.status(code).json(response);
};

const getCategories = async (req: Request, res: Response): Promise<Response> => {
  const { code, response }: IServices = await services.getCategories();

  return res.status(code).json(response);
};

export { createCategory, getCategories };
