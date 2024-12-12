import express from 'express';
import { createCheckoutSession, getConfig, webhook } from '../controllers/checkoutController.js';

const router = express.Router();

router.get('/config', getConfig);

router.post('/create-checkout-session', createCheckoutSession);

router.post('/webhook', webhook);

export default router;

