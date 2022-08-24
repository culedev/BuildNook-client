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
  "pk_test_51LZa7LDzSkiitMALH1fgvODonQwkQxAj9E7h2L1SbJsMTTX8qIermoSAFCG1Nbf7DfNJLokJxum7o5URMQqMX76N00ZoTHN1Ig"
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
