import { Router } from 'express';
import { login, refreshToken } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/refreshToken', refreshToken);

export default router;
