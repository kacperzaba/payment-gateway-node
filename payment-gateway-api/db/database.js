import { createPool } from 'mysql2';
import configs from 'dotenv';
import ApiError from '../error/ApiError.js';

const pool = createPool({
    host: 'localhost', // zmienna srodowiskowa
    user: 'root',
    password: 'root',
    database: 'payment-gateway-db'
}).promise();

const mysqlConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Database connected successfully'); // usunac
    } catch (err) {
        throw new Error();
    }
}

export default mysqlConnection;