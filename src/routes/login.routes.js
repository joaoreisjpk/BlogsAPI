const { Router } = require('express');
const { Login, LoginValidation } = require('../controllers/LoginController');

const router = Router();

router.post('/', LoginValidation, Login);

module.exports = router;
