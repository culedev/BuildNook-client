import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Payment.css";
import { postIntentPayment } from "../../services/transaction.services";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_KEY}`
);

export default function PaymentIntent({ cartProducts }) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    getPayment();
  }, []);

  const getPayment = async () => {
    const response = await postIntentPayment({items: cartProducts.shoppingCart});
    setClientSecret(response.data.clientSecret);
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
