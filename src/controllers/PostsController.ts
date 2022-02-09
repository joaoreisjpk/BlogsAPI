import { NextFunction, Request, Response } from "express";

import 'dotenv/config';
const postsServices = require('../services/PostsServices');
const Validate = require('../helpers/Validations');

const validateCreate = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, categoryIds } = req.body;

  try {
    Validate.Title(title);
    Validate.Content(content);
    await Validate.CategoryIds(categoryIds);
    next();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const validateUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const { categoryIds, title, content } = req.body;
  try {
    await Validate.UpdateValidation({ categoryIds, title, content });
    next();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const createPost = async (req: Request, res: Response) => {
  const { status, response } = await postsServices.createPost({ ...req.body, id: req.body.user.id });

  return res.status(status).json(response);
};

const getPosts = async (req: Request, res: Response) => {
  const { code, response } = await postsServices.getPosts();

  return res.status(code).json(response);
};

const getPostId = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { code, response } = await postsServices.getPostId({ id });

  return res.status(code).json(response);
};

const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.body.user;

  const { code, response } = await postsServices.updatePost({
    id,
    userId,
    ...req.body,
  });

  return res.status(code).json(response);
};

const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { id: userId } = req.body.user;

  const { code, response } = await postsServices.deletePost({ id, userId });

  return res.status(code).json(response);
};

const queryPosts = async (req: Request, res: Response) => {
  const { q } = req.query;
  const { code, response } = await postsServices.queryPosts(q);

  return res.status(code).json(response);
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
