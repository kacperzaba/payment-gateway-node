import express, { json } from 'express';
import apiErrorHandler from './error/api-error-handler.js';
import cors from 'cors';
import router from './routes/auth.js';

const app = express();
app.use(cors());
app.use(json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router)

app.use(apiErrorHandler);

export default app;
