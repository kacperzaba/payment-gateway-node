import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const checkoutRouter = express.Router();

checkoutRouter.post("/create-checkout-session", async (req, res, next) => {
    try{
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            mode:"payment",
            line_items: req.body.items.map(item => {
                return{
                    price_data:{
                        currency:"usd",
                        product_data:{
                            name: item.name
                        },
                        unit_amount: (item.price)*100,

                    },
                    quantity: item.quantity
                }
            }),
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel'
        })

        res.json({url: session.url})

    }catch(e){
     res.status(500).json({error:e.message})
    }
})

export default checkoutRouter;