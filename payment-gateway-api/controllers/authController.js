import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail } from '../services/authService.js';

export const register = async (req, res) => {
    const { email, password, role } = req.body;

    const isExist = await findUserByEmail(email);
    if (isExist) {
        return next(ApiError.badRequest('Email is already in use'));
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ email, password: hashedPassword, role });

    res.status(201).json({ message: 'User created', user: newUser });
}

export const login = async (req,res) => {
    const { email, password } = req.body;
    
    const user = await findUserByEmail(email);
    if (!user) {
        return next(ApiError.unauthorized());
    }

    const passowrdMatch = await bcrypt.compare(password, user.password);
    if (!passowrdMatch) {
        return next(ApiError.unauthorized());
    }

    const accessToken = jwt.sign({id: user.id, role: user.role}, process.env.JWT_SECRET); 
    res.json({ accessToken: accessToken });
}