require('dotenv').config();

const postsServices = require('../services/PostsServices');

const createPost = async (req, resp) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;

  const { status, response } = await postsServices.createPost({
    id,
    title,
    content,
    categoryIds,
  });

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

  const { code, response } = await postsServices.updatePost({ id });

  return resp.status(code).json(response);
};

module.exports = { createPost, getPosts, getPostId, updatePost };
