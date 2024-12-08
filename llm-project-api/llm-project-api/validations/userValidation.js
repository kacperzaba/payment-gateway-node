import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";

const JoiPassword = Joi.extend(joiPasswordExtendCore);

export const registerSchema = Joi.object({
    email: Joi.string().min(8).max(255).email({ minDomainSegments: 2 }).required(),
    password: JoiPassword.string().min(8).max(255).minOfSpecialCharacters(1).minOfNumeric(1).noWhiteSpaces().required(),
    role: Joi.string().valid('admin', 'user')
});

export const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: JoiPassword.string().required()
});