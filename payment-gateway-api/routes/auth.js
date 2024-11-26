import express from 'express';
import User from '../models/User.js';
import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken from '../middlewares/authMiddleware.js'
import { hasRole } from '../middlewares/roleMiddleware.js';
import { registerSchema, loginSchema } from '../validations/userValidation.js';
import { validateRequest } from '../middlewares/validationMiddleware.js'

const router = express.Router();

router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
    const { email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return next(ApiError.badRequest('Email is already in use'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword, role });
    res.status(201).json({ message: 'User created', user: newUser });
});

router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return next(ApiError.unauthorized());
    }

    const passowrdMatch = await bcrypt.compare(password, user.password);
    if (!passowrdMatch) {
        return next(ApiError.unauthorized());
    }

    const accessToken = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET); 
    res.json({ accessToken: accessToken });
});

router.get('/admin-test', verifyToken, hasRole('admin'), (req, res) => {
    res.json({ message: 'Welcome, Admin!' });
});


export default router; 