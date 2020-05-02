import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../App.css";
import "../assets/css/Payment.css";

const Payment = () => {
  const location = useLocation();
  console.log(location);
  let { productId, files, title, price } = location.state;

  return (
    <>
      <Helmet>
        <title>Règlement {title}</title>
      </Helmet>
      <div className="payment-container">
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
          <div className="payment-card">
            <h1> Acheter en ligne </h1>
            <img alt="offer" src={files} className="payment-picture" />
            <h3>{title}</h3>
            <p>{price} €</p>
            <h3>Vos coordonnées bancaires</h3>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    </>
  );
};
export default Payment;
