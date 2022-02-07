const { Router } = require('express');
const { Login } = require('../controllers/LoginController');

const router = Router();

router.post('/', Login);

module.exports = router;
