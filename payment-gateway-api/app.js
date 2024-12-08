import express from 'express';
import dotenv from 'dotenv';
import apiErrorHandler from './error/errorHandler.js';
import authRouter from './routes/auth.js';
import initializeDatabase from './config/initializeDatabase.js';
import { seedRoles } from './seeders/seedRoles.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

app.use(apiErrorHandler);

await initializeDatabase();
await seedRoles();

export default app;
