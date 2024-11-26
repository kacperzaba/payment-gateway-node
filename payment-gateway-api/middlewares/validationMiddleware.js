import ApiError from "../error/ApiError.js";

export const validateRequest = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return next(ApiError.badRequest(error.details[0].message));
    }
    next();
};