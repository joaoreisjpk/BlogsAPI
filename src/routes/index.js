const { Router } = require('express');

const router = Router();

const userRouter = require('./user.routes');
const loginRouter = require('./login.routes');
const categorieRouter = require('./categories.routes');
const postsRouter = require('./posts.routes');

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/categories', categorieRouter);
router.use('/post', postsRouter);

module.exports = router;
