import { Router } from 'express';
import { login, logout, refresh, me, changeCredentials } from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth.middleware';
import { loginLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/login', loginLimiter, login);
router.post('/logout', authenticate, logout);
router.post('/refresh', refresh);
router.get('/me', authenticate, me);
router.put('/credentials', authenticate, changeCredentials);

export default router;
