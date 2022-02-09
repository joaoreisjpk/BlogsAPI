import 'dotenv/config';
import { Categories } from '../../models';

const createCategory = async (name: string) => {
  try {
    const category = await Categories.create({ name });

    return { status: 201, response: category.dataValues };
  } catch (err) {
    return { status: 409, response: { message: 'User already registered' } };
  }
};

 const getCategories = async () => {
  try {
    const categories = await Categories.findAll();
    return { code: 200, response: categories };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

export default { createCategory, getCategories };
