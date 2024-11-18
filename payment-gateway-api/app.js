import express, { json } from 'express';
import router from './routes/tweet.js';
import apiErrorHandler from './error/api-error-handler.js';
import mysqlConnection from './db/database.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true })); //
app.use('/', router);



app.use(apiErrorHandler);

await mysqlConnection();

export default app;