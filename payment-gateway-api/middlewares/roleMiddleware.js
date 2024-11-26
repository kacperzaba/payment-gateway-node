import ApiError from '../error/ApiError.js';

export const hasRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return next(ApiError.customError(401, 'Access denied. Insufficient permissions.'));
        }
        next(); 
    };
};
