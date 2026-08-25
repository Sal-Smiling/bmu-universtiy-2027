import express from 'express';
import { loginUser, registerUser, getMe } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
// Registration disabled to prevent unknown users
// router.post('/register', registerUser);
router.get('/me', protect, getMe);

export default router;

