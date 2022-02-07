const { Router } = require('express');
const {
  createPost,
  deletePost,
  getPostId,
  getPosts,
  queryPosts,
  updatePost,
} = require('../controllers/PostsController');
const { tokenValidation } = require('../controllers/UserController');

const router = Router();

router.post('/', tokenValidation, createPost);

router.get('/search', tokenValidation, queryPosts);

router.get('/:id', tokenValidation, getPostId);

router.get('/', tokenValidation, getPosts);

router.put('/:id', tokenValidation, updatePost);

router.delete('/:id', tokenValidation, deletePost);

module.exports = router;
