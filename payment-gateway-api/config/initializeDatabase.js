import sequelize from './database.js';
import Role from '../models/Role.js';
import User from '../models/User.js';

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false }); 
    } catch (err) {
        throw ApiError.dbConnectionError();
    }
};

Role.belongsToMany(User, { through: 'user_roles' });
User.belongsToMany(Role, { through: 'user_roles' });

export default initializeDatabase;
