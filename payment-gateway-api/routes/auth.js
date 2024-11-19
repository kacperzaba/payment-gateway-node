import express from 'express';
import User from '../models/User.js';
import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw ApiError.badRequest('Email is already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword });
        res.status(201).json({ message: 'User created', user: newUser });
    } catch (err) {
        next(err); 
    }
});


router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw ApiError.unauthorized();
    }

    const passowrdMatch = await bcrypt.compare(password, user.password)
    if (!passowrdMatch) {
        throw ApiError.unauthorized();
    }

    const accessToken = jwt.sign(user.email, process.env.JWT_SECRET);
    res.json({ accessToken: accessToken });
})

export default router; 
