const { Router } = require('express');
const {
  createCategory,
  getCategories,
} = require('../controllers/CategoriesController');

const router = Router();

router.post('/', createCategory);
router.get('/', getCategories);

module.exports = router;
