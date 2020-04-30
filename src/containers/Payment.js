import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";

const Payment = () => {
  return (
    <StripeProvider apiKey="pk_test_YOUR_PUBLIC_API_KEY">
      <div className="example">
        <h1>Page en construction ...</h1>
        <Elements>
          <CheckoutForm />
        </Elements>
      </div>
    </StripeProvider>
  );
};
export default Payment;
