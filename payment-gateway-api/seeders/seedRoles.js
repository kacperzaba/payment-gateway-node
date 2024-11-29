import Role from '../models/Role.js';

export const seedRoles = async () => {
    try {
        const roles = [
            { name: 'admin' },
            { name: 'user' },
        ];

        await Role.bulkCreate(roles, { ignoreDuplicates: true }); 
    } catch (err) {
        console.error('Error seeding roles:', err);
    }
};


