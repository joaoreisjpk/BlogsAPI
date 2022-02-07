const { Router } = require('express');
const {
  createCategory,
  getCategories,
} = require('../controllers/CategoriesController');
const { tokenValidation } = require('../controllers/UserController');

const router = Router();

router.post('/', tokenValidation, createCategory);
router.get('/', tokenValidation, getCategories);

module.exports = router;
