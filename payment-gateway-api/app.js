import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiErrorHandler from './error/api-error-handler.js';
import authRouter from './routes/auth.js';
import initializeDatabase from './config/initializeDatabase.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.use(apiErrorHandler);

await initializeDatabase();

export default app;
