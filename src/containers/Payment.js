import React from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "../components/CheckoutForm";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import Cookies from "js-cookie";
import "../App.css";
import "../assets/css/Payment.css";

const Payment = () => {
  // accéder à la valeur du cookie "token"
  const token = Cookies.get("token");
  // accéder à la valeur du cookie "username"
  const username = Cookies.get("username");
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
            <img alt="offer" src={files} className="payment-picture" />
            <h3>{title}</h3>
            <p>{price} €</p>
            <h3>Vos coordonnées bancaires</h3>
            {/* conteneur de tous les inputs de coordonnées bancaires */}
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    </>
  ) : (
    <Link to="/login">Se connecter</Link>
  );
};
export default Payment;
