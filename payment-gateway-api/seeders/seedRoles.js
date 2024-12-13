import ApiError from '../error/ApiError.js';
import Role from '../models/Role.js';

export const seedRoles = async () => {
    try {
        const roles = [
            { name: 'admin' },
            { name: 'user' },
        ];

        await Role.bulkCreate(roles, { ignoreDuplicates: true }); 
    } catch (err) {
        throw ApiError.badRequest("Error seeding roles");
    }
};


