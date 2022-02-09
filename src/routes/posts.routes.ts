import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPostId,
  getPosts,
  queryPosts,
  updatePost,
  validateCreate,
  validateUpdate,
} from '../controllers/PostsController';
import { tokenValidation } from '../controllers/TokenController';

const router = Router();

router.post('/', tokenValidation, validateCreate, createPost);

router.get('/search', tokenValidation, queryPosts);

router.get('/:id', tokenValidation, getPostId);

router.get('/', tokenValidation, getPosts);

router.put('/:id', tokenValidation, validateUpdate, updatePost);

router.delete('/:id', tokenValidation, deletePost);

export default router;
