import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return next(ApiError.unauthorized());
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return next(ApiError.unauthorized());
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (err) {
        next(ApiError.unauthorized());
    }
};

export default verifyToken;
