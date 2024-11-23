import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return next(ApiError.unauthorized('No token provided'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        next(ApiError.unauthorized('Invalid token'));
    }
};
