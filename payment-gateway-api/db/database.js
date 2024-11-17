import { createPool } from 'mysql2';
import dotenv from 'dotenv';
import ApiError from '../error/ApiError.js';

dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}).promise();

const mysqlConnection = async () => {
    try {
        await pool.getConnection();
    } catch (err) {
        throw ApiError.customError(500, err.message);
    }
}

export default mysqlConnection;