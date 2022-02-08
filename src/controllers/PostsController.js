require('dotenv').config();

const postsServices = require('../services/PostsServices');
const Validate = require('../helpers/Validations');

const validateCreate = async (req, res, next) => {
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

const validateUpdate = async (req, res, next) => {
  const { categoryIds, title, content } = req.body;
  try {
    await Validate.UpdateValidation({ categoryIds, title, content });
    next();
  } catch ({ message }) {
    res.status(400).json({ message });
  }
};

const createPost = async (req, resp) => {
  const { status, response } = await postsServices.createPost({ ...req.body, id: req.user.id });

  return resp.status(status).json(response);
};

const getPosts = async (req, resp) => {
  const { code, response } = await postsServices.getPosts();

  return resp.status(code).json(response);
};

const getPostId = async (req, resp) => {
  const { id } = req.params;

  const { code, response } = await postsServices.getPostId({ id });

  return resp.status(code).json(response);
};

const updatePost = async (req, resp) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const { code, response } = await postsServices.updatePost({
    id,
    userId,
    ...req.body,
  });

  return resp.status(code).json(response);
};

const deletePost = async (req, resp) => {
  const { id } = req.params;
  const { id: userId } = req.user;

  const { code, response } = await postsServices.deletePost({ id, userId });

  return resp.status(code).json(response);
};

const queryPosts = async (req, resp) => {
  const { q } = req.query;
  const { code, response } = await postsServices.queryPosts(q);

  return resp.status(code).json(response);
};

module.exports = {
  createPost,
  getPosts,
  getPostId,
  updatePost,
  deletePost,
  queryPosts,
  validateCreate,
  validateUpdate,
};
