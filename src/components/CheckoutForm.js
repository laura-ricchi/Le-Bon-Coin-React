import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import "../App.css";
import "../assets/css/CheckoutForm.css";

const CheckoutForm = ({ stripe, title, price, username, productId }) => {
  const [complete, setComplete] = useState(false);

  return !complete ? (
    <div className="checkout">
      {/* affichage du formulaire de la carte bleue */}
      <CardElement />
      {/* création d'un bouton onClick pour la création du token */}
      <button
        onClick={async (event) => {
          // envoi du numéro de carte à Stripe
          // stripe.createToken = variable à utiliser pour récupérer le token et avoir accès à la variable Stripe
          const stripeResponse = await stripe.createToken({
            name: { username },
          });

          const stripeToken = stripeResponse.token.id;

          if (stripeResponse.error) {
            alert(stripeResponse.error.message);
          } else {
            // Stripe nous retourne un token
            console.log("stripeResponse.token", stripeResponse.token);

            // envoi du token au backend
            const paymentResponse = await axios.post(
              "https://my-project-backend-leboncoin.herokuapp.com/payment",
              {
                stripeToken: stripeToken.token.id,
              }
            );
            console.log("paymentResponse", paymentResponse);

            // confirmation par le backend que le paiement a été effectué
            if (paymentResponse.status === 200) {
              setComplete(true);
            } else {
              alert("An error occurred");
              console.error(paymentResponse);
            }
          }
        }}
      >
        <p> Procéder au règlement</p>
      </button>
    </div>
  ) : (
    <span>Purchase Complete</span>
  );
};

export default injectStripe(CheckoutForm);
