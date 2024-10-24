import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('your-stripe-public-key');

function Payment() {
    const [amount, setAmount] = useState(0);
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        if (error) {
            console.log(error);
        } else {
            console.log(paymentIntent);
        }
    };

    return (
        <Elements stripe={stripePromise}>
            <form onSubmit={handleSubmit}>
                <label>Amount</label>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={e => setAmount(e.target.value)} 
                />
                <CardElement />
                <button type="submit">Pay</button>
            </form>
        </Elements>
    );
}

export default Payment;
