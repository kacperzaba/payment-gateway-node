import ApiError from '../error/ApiError.js';
import User from '../models/User.js';

export const hasRole = (...allowedRoles) => {
    return async (req, res, next) => {
        const user = await User.findByPk(req.user.id, { include: 'Roles' });

        if (!user) {
            return next(ApiError.unauthorized('User not found.'));
        }

        const userHasRole = user.Roles.some(role => allowedRoles.includes(role.name));

        if (!userHasRole) {
            return next(ApiError.forbidden(`Require one of the following roles: ${allowedRoles.join(', ')}`));
        }

        next();
    };
};
