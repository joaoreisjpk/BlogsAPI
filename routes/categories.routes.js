const { Router } = require('express');
const userController = require('../controllers/CategoriesController');

const router = Router();

router.post('/', userController.tokenValidation, userController.createCategory);
/* router.get('/:id', userController.tokenValidation, userController.getUserId);
router.get('/', userController.tokenValidation, userController.getUsers); */

module.exports = router;
