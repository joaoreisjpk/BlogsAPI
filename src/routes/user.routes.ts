import { Router } from 'express';
import { tokenValidation } from '../controllers/TokenController';
import {
  createUser,
  deleteUser,
  getUserId,
  getUsers,
  validateUser,
} from '../controllers/UserController';

const router = Router();

router.post('/', validateUser, createUser);
router.get('/:id', tokenValidation, getUserId);
router.get('/', tokenValidation, getUsers);
router.delete('/me', tokenValidation, deleteUser);

export default router;
