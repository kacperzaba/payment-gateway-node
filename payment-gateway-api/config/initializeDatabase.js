import sequelize from './database.js';

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); 
    } catch (err) {
        throw ApiError.dbConnectionError();
    }
};

export default initializeDatabase;
