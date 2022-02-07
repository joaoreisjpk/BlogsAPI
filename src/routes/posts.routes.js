const { Router } = require('express');
const postsController = require('../controllers/PostsController');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/', userController.tokenValidation, postsController.createPost);
// router.get('/:id', userController.tokenValidation, postsController.getPostsId);
router.get('/:id', userController.tokenValidation, postsController.getPostId);
router.get('/', userController.tokenValidation, postsController.getPosts);
router.put('/:id', userController.tokenValidation, postsController.updatePost);

module.exports = router;
