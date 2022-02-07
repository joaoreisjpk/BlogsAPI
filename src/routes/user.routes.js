const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.tokenValidation, userController.getUserId);
router.get('/', userController.tokenValidation, userController.getUsers);
router.remove('/me', userController.tokenValidation, userController.getUsers);

module.exports = router;
