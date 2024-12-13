import ApiError from '../error/ApiError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { apiResponse } from '../response/apiResponse.js';

export const register = async (req, res, next) => {
    const { email, password, role } = req.body;

    const isExist = await User.findOne( {where: {email} });
    if (isExist) {
        return next(ApiError.badRequest('Email is already in use'));
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email: email,
        password: hashedPassword
    });

    if (role) {
        const roles = await Role.findAll({
            where: {
                name: role,
            },
        });

        if (roles.length === 0) {
            return next(ApiError.badRequest('Invalid role'));
        }

        await newUser.addRoles(roles);
    };

    return apiResponse.response(res, 201, newUser);
}

export const login = async (req,res, next) => {
    const { email, password } = req.body;
    
    const user = await User.findOne( {where: {email} });
    if (!user) {
        return next(ApiError.unauthorized());
    }

    const passowrdMatch = await bcrypt.compare(password, user.password);
    if (!passowrdMatch) {
        return next(ApiError.unauthorized());
    }

    const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET); 
    return apiResponse.response(res, 200, accessToken);
}