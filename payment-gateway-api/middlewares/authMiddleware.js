import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return next(ApiError.unauthorized());
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return next(ApiError.unauthorized());
    }

    try {
        const verifyAsync = promisify(jwt.verify);
        const decoded = await verifyAsync(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        next(ApiError.unauthorized());
    }
};




export default verifyToken;
