const { Router } = require('express');

const router = Router();
const { tokenValidation } = require('../controllers/UserController');

const userRouter = require('./user.routes');
const loginRouter = require('./login.routes');
const categorieRouter = require('./categories.routes');
const postsRouter = require('./posts.routes');

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/categories', tokenValidation, categorieRouter);
router.use('/post', tokenValidation, postsRouter);

module.exports = router;
