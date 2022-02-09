import 'dotenv/config';
import { IServices } from '../interfaces';
import db from '../models';

const createCategory = async (name: string): Promise<IServices> => {
  try {
    const category = await db.Categories.create({ name });

    return { code: 201, response: category.dataValues };
  } catch (err) {
    return { code: 409, response: { message: 'User already registered' } };
  }
};

 const getCategories = async (): Promise<IServices> => {
  try {
    const categories = await db.Categories.findAll();
    return { code: 200, response: categories };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

export { createCategory, getCategories };
