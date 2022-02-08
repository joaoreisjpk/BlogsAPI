const { Router } = require('express');
const {
  createPost,
  deletePost,
  getPostId,
  getPosts,
  queryPosts,
  updatePost,
  validateCreate,
  validateUpdate,
} = require('../controllers/PostsController');
const { tokenValidation } = require('../controllers/TokenController');

const router = Router();

router.post('/', tokenValidation, validateCreate, createPost);

router.get('/search', tokenValidation, queryPosts);

router.get('/:id', tokenValidation, getPostId);

router.get('/', tokenValidation, getPosts);

router.put('/:id', tokenValidation, validateUpdate, updatePost);

router.delete('/:id', tokenValidation, deletePost);

module.exports = router;
