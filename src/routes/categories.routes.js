const { Router } = require('express');
const categoriesController = require('../controllers/CategoriesController');
const userController = require('../controllers/UserController');

const router = Router();

router.post('/', userController.tokenValidation, categoriesController.createCategory);
router.get('/', userController.tokenValidation, categoriesController.getCategories);

module.exports = router;
