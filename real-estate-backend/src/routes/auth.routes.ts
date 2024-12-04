import express from 'express';
import { login, loginAdmin, register, requestOtp, resetPassword } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/admin-login', loginAdmin);
router.post('/login', login);

// Request password reset
router.post('/forgot-password', requestOtp);
router.post('/reset-password', resetPassword);

export default router;
