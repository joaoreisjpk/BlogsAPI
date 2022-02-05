const { Router } = require('express');
const categoriesController = require('../controllers/CategoriesController');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/', userController.tokenValidation, categoriesController.createCategory);
/* router.get('/:id', userController.tokenValidation, userController.getUserId);
router.get('/', userController.tokenValidation, userController.getUsers); */

module.exports = router;
