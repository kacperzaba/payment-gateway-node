import express from 'express';
import dotenv from 'dotenv';
import apiErrorHandler from './error/errorHandler.js';
import authRouter from './routes/auth.js';
import checkoutRouter from './routes/stripeCheckout.js';
import initializeDatabase from './config/initializeDatabase.js';
import { seedRoles } from './seeders/seedRoles.js';
import cors from 'cors';


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:5173", // Allow requests from your frontend
        methods: ["GET", "POST"],       // Specify allowed methods
        credentials: true               // Allow credentials if needed (e.g., cookies)
    })
);

app.use('/api/auth', authRouter);
app.use('/api/payment', checkoutRouter);

app.use(apiErrorHandler);

await initializeDatabase();
await seedRoles();

export default app;
