import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe("pk_test_51PO7bN07IhMn5YlchQ4y4cZBuBGWmsocZw2NLUN9lw3PMOq5OOKn1YtxyPBLxzzYRMz2XX5Bj0v72o4PjvEQD39C00hlDi1adl");

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const {id} = paymentMethod;

            try {
                const response = await axios.post('/api/v1/create-payment-intent', {
                    paymentMethodId: id
                });

                const data = response.data;

                console.log(data);
            } catch (error) {
                console.error('Error making request:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
            {error && <div>{error}</div>}
            {success && <div>Payment successful!</div>}
        </form>
    );
};

const Payment = () => (
    <Elements stripe={stripePromise}>
        <PaymentForm />
    </Elements>
);

export default Payment;
