import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import "../App.css";
import "../assets/css/CheckoutForm.css";

const CheckoutForm = ({ stripe, title, price, username, productId, token }) => {
  const [complete, setComplete] = useState(false);

  const submitFormPayment = async () => {
    try {
      // envoi du numéro de carte à Stripe
      // stripe.createToken = variable à utiliser pour récupérer le token et avoir accès à la variable Stripe
      const stripeResponse = await stripe.createToken({
        name: username,
      });

      const stripeToken = stripeResponse.token.id;

      // envoi du token au backend
      const paymentResponse = await axios.post(
        "https://my-project-backend-leboncoin.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          title: title,
          productId: productId,
          price: price,
          token: token,
        }
      );
      // le backend nous confirme si le paiement a été effectué
      if (paymentResponse.status === 200) {
        setComplete(true);
        console.log("paiement effectué");
      } else {
        alert("An error occurred");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };
  // si le paiement est effectué affichage d'un message de confirmation
  if (complete) {
    return <div>Merci pour votre achat ! Paiement effectué! </div>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout">
        <h3>Vos coordonnées bancaires</h3>
        {/* affichage du formulaire de la carte bleue */}
        <CardElement />
        {/* création d'un bouton onClick pour la création du token */}
        <button onClick={submitFormPayment}>
          <p> Procéder au règlement</p>
        </button>
      </div>
    </div>
  );
};

export default injectStripe(CheckoutForm);
