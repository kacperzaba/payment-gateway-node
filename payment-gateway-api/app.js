import express, { json } from 'express';
import router from './routes/tweet.js';
import apiErrorHandler from './error/api-error-handler.js';
import authRoute from './routes/auth.js';
import mysqlConnection from './db/database.js';

const app = express();

app.use(json());
app.use('/', router);
app.use('/api/user', authRoute);

app.use(apiErrorHandler);

await mysqlConnection();

export default app;