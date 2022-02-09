import { Router } from 'express';

const router = Router();

const userRouter = require('./user.routes');
const loginRouter = require('./login.routes');
const categorieRouter = require('./categories.routes');
const postsRouter = require('./posts.routes');
const { tokenValidation } = require('../controllers/TokenController');

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/categories', tokenValidation, categorieRouter);
router.use('/post', tokenValidation, postsRouter);

export default router;
