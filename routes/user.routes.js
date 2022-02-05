const { Router } = require('express');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/', userController.createUser);
router.get('/:id', userController.getUserId);
router.get('/', userController.getUsers);

module.exports = router;