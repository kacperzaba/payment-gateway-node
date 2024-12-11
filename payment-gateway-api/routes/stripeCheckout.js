import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const checkoutRouter = express.Router();

checkoutRouter.get("/config", async (req, res) => {
    const price = await stripe.prices.retrieve(process.env.PRICE);
    console.log(price);
    res.send({
        publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
        unitAmount: price.unit_amount,
        currency: price.currency,
    })
})

checkoutRouter.post("/create-checkout-session", async (req, res, next) => {
    const domainURL = process.env.DOMAIN;

    const { quantity } = req.body;

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price: process.env.PRICE,
                quantity: quantity
            },
        ],

        success_url: `${domainURL}/success`,
        cancel_url: `${domainURL}/cancel`
    });

    return res.redirect(303, session.url);
})

export default checkoutRouter;