import express from 'express';
import verifyToken from '../middlewares/authMiddleware.js'
import { hasRole } from '../middlewares/roleMiddleware.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';
import { validateRequest } from '../middlewares/validationMiddleware.js'
import { register, login } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);

router.post('/login', validateRequest(loginSchema), login);

router.get('/admin-test', verifyToken, hasRole('admin'), (req, res) => {
    res.json({ message: 'admin test' });
});

export default router; 