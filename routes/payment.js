const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-stripe-key');

// Create Payment Intent
router.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100, // amount in cents
        currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
});

module.exports = router;
