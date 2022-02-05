const { Router } = require('express');
const postsController = require('../controllers/PostsController');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/', userController.tokenValidation, postsController.createPost);
/* router.get('/:id', postsController.tokenValidation, postsController.getpostsId);
router.get('/', postsController.tokenValidation, postsContr oller.getUsers);
*/
module.exports = router;
