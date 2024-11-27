import User from "../models/User.js";

export const createUser = async (user) => {
    return await User.create(user);
};

export const findUserByEmail = async (email) => {
    return await User.findOne( {where: {email} });
};
