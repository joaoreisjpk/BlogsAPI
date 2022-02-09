import { Router } from 'express';
import { Login, LoginValidation } from '../controllers/LoginController';

const router = Router();

router.post('/', LoginValidation, Login);

export default router
