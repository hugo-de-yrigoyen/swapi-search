import { Router } from 'express';
import { login, verify } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/login', login);
router.get('/verify', authenticateToken, verify);

export default router;