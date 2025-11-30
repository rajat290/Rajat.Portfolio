import express from 'express';
import { login, logout, verifyToken, register } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';
import { validate, authValidation } from '../middleware/validation';

const router = express.Router();

// Public routes
router.post('/login', validate(authValidation.login), login);
router.post('/register', validate(authValidation.register), register); // Only for development

// Protected routes
router.post('/logout', authenticateToken, logout);
router.get('/verify', authenticateToken, verifyToken);

export default router;
