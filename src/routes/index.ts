import { Router } from 'express';

const router = Router();

import userRouter from './user.routes';
import loginRouter from './login.routes';
import categorieRouter from './categories.routes';
import postsRouter from './posts.routes';
import { tokenValidation } from'../controllers/TokenController';

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/categories', tokenValidation, categorieRouter);
router.use('/post', tokenValidation, postsRouter);

export default router;
