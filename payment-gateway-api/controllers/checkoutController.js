import dotenv from 'dotenv';
import Stripe from 'stripe';
import ApiError from '../error/ApiError.js';
import Transaction from '../models/Transaction.js';
import Result from '../result/Result.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getConfig = async (req, res, next) => {
    const price = await stripe.prices.retrieve(process.env.PRICE);
    const responseData = {
        publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
        unitAmount: price.unit_amount,
        currency: price.currency,
    };

    return Result.ApiResult(res, 200, responseData);
}

export const createCheckoutSession = async (req, res, next) => {
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

    const transaction = await Transaction.create({
      paymentSystemTransactionId: session.id,
      transactionStatus: 'checkout.session.created',
      paymentSystem: 'stripe',
      createdDate: new Date(),
    });

    return Result.ApiResult(res, 303, { url: session.url });
}

export const webhook = async (req, res, next) => {
    let data;
    let eventType;
    let session;

    if (process.env.STRIPE_WEBHOOK_SECRET) {
      let event;
      let signature = req.headers['stripe-signature'];
  
      try {
        event = stripe.webhooks.constructEvent(
          req.rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );

        session = event.data.object;
      } catch (err) {
        return new ApiError.badRequest("Webhook signature verification failed.");
      }
      data = event.data;
      eventType = event.type;
    } else {
      data = req.body.data;
      eventType = req.body.type;
    }
    
    Transaction.update({
      transactionStatus: eventType,
      amount: session.amount_total,
      currency: session.currency,
      errorMessage: session.error
    }, {
      where: { paymentSystemTransactionId: session.id },
    })
  
    return Result.ApiResult(res, 200, null);
}