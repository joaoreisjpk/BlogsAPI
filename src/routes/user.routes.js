const { Router } = require('express');
const {
  createUser,
  deleteUser,
  getUserId,
  getUsers,
  tokenValidation,
} = require('../controllers/UserController');

const router = Router();

router.post('/', createUser);
router.get('/:id', tokenValidation, getUserId);
router.get('/', tokenValidation, getUsers);
router.delete('/me', tokenValidation, deleteUser);

module.exports = router;
