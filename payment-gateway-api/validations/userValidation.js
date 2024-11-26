import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().min(5).max(255).email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(255).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    role: Joi.string().valid('admin', 'user').required()
});

export const loginSchema = Joi.object({
    email: Joi.string().min(5).max(255).email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(5).max(255).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});