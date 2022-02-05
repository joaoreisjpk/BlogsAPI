const { Router } = require('express');
const loginController = require('../controllers/LoginController');

const router = Router();

router.post('/', loginController.Login);