import { Request, Response } from "express";
import 'dotenv/config';

import categoriesService from '../services/CategoriesServices';

const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  const { status, response } = await categoriesService.createCategory(name);

  return res.status(status).json(response);
};

const getCategories = async (req: Request, res: Response) => {
  const { code, response } = await categoriesService.getCategories();

  return res.status(code).json(response);
};

export { createCategory, getCategories };
