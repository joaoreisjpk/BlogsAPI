import 'dotenv/config';
import jwt from 'jsonwebtoken';
import db from '../models';

const secret = process.env.JWT_SECRET || '';

const jwtConfig: any = { expiresIn: '1d', algorithm: 'HS256' };

const createUser = async ({ displayName, email, password, image }: any) => {
  try {
    await db.Users.create({ displayName, email, password, image });

    const token = jwt.sign({ data: email }, secret, jwtConfig);

    return { status: 201, response: { token } };
  } catch (err) {
    return { status: 409, response: { message: 'User already registered' } };
  }
};

const getUsers = async () => {
  try {
    const users = await db.Users.findAll();
    return { code: 200, response: users };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

const getSpecificUser = async (data: any) => {
  const user = await db.Users.findOne({ where: data, raw: true });

  if (!user) {
    return { code: 404, response: { message: 'User does not exist' } };
  }
  return { code: 200, response: user };
};

const deleteUser = async ({ id }: any) => {
  try {
    await db.Users.destroy({ where: { id } });

    return { code: 204 };
  } catch ({ message }) {
    return { code: 401, response: { message } };
  }
};

export {
  createUser,
  getUsers,
  getSpecificUser,
  deleteUser,
};
