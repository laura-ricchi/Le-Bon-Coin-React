import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";
import { Redirect, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../App.css";
import "../assets/css/Payment.css";
import "../assets/css/CheckoutForm.css";

const Payment = ({ token, username }) => {
  const location = useLocation();
  console.log(location);
  let { productId, files, title, price } = location.state;

  return token ? (
    <>
      <Helmet>
        <title>Règlement {title}</title>
      </Helmet>
      <div className="payment-container">
        {/* composant à la racine pour interargir avec Stripe */}
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}>
          <div className="payment-card">
            <h1> Acheter en ligne </h1>
            <img alt={title} src={files} className="payment-picture" />
            <h3>{title}</h3>
            <p>{price} €</p>
            {/* conteneur de tous les inputs de coordonnées bancaires */}
            <Elements>
              <CheckoutForm
                username={username}
                title={title}
                productId={productId}
                price={price}
                token={token}
              />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    </>
  ) : (
    <Redirect to="/login">Se connecter</Redirect>
  );
};
export default Payment;
