import express from 'express';
import dotenv from 'dotenv';
import apiErrorHandler from './error/errorHandler.js';
import authRouter from './routes/auth.js';
import checkoutRouter from './routes/checkout.js';
import initializeDatabase from './config/initializeDatabase.js';
import { seedRoles } from './seeders/seedRoles.js';
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import fs from 'fs';
const swaggerDocument = JSON.parse(fs.readFileSync('./docs/swagger.json', 'utf-8'));
import Transaction from './models/Transaction.js';

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl.startsWith('/api/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.use(
    cors({
        origin: '*', 
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
        credentials: true 
    })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', authRouter);
app.use('/api', checkoutRouter);

app.use(apiErrorHandler);

await initializeDatabase();
await seedRoles();


export default app;
