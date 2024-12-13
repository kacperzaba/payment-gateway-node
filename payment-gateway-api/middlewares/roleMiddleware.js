import ApiError from '../error/ApiError.js';
import User from '../models/User.js';

export const hasRole = (...allowedRoles) => {
    return async (req, res, next) => {
        const user = await User.findByPk(req.user.id, { include: 'Roles' });

        if (!user) {
            return next(ApiError.unauthorized());
        }

        const userHasRole = user.Roles.some(role => allowedRoles.includes(role.name));

        if (!userHasRole) {
            return next(ApiError.badRequest(`Require one of the following roles: ${allowedRoles.join(', ')}`));
        }

        next();
    };
};
