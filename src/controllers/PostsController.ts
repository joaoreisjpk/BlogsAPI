import { NextFunction, Request, Response } from "express";

import 'dotenv/config';
import { IPost, IServices } from "../interfaces";
import * as services from '../services/PostsServices';
import * as Validate from '../helpers/Validations';

const validateCreate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { title, content, categoryIds }: IPost = req.body;

  try {
    Validate.Title(title);
    Validate.Content(content);
    await Validate.CategoryIds(categoryIds);
    next();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const validateUpdate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { categoryIds, title, content }: IPost = req.body;
  try {
    await Validate.UpdateValidation({ categoryIds, title, content });
    next();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  const { code, response }: IServices = await services.createPost({ ...req.body, id: req.body.user.id });

  res.status(code).json(response);
};

const getPosts = async (req: Request, res: Response): Promise<void> => {
  const { code, response }: IServices = await services.getPosts();

  res.status(code).json(response);
};

const getPostId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const { code, response }: IServices = await services.getPostId({ id });

  res.status(code).json(response);
};

const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { id: userId } = req.body.user;

  const { code, response }: IServices = await services.updatePost({
    id,
    userId,
    ...req.body,
  });

  res.status(code).json(response);
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { id: userId } = req.body.user;

  const { code, response }: IServices = await services.deletePost({ id: Number(id), userId });

  res.status(code).json(response);
};

const queryPosts = async (req: Request, res: Response): Promise<void> => {
  const { q }: any = req.query;
  const query: { email?: string, id?: string } = q;

  const { code, response }: IServices = await services.queryPosts(query);

  res.status(code).json(response);
};

export {
  createPost,
  getPosts,
  getPostId,
  updatePost,
  deletePost,
  queryPosts,
  validateCreate,
  validateUpdate,
};
