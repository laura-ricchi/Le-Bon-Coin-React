import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false);

  return !complete ? (
    <div className="checkout">
      <p>Souhaitez-vous terminer l'achat? </p>
      {/* affichage du formulaire de la carte bleue */}
      <CardElement />
      <button
        onClick={async (event) => {
          // envoi du numéro de carte à Stripe
          const stripeResponse = await stripe.createToken({
            name: "Identifiant de l'acheteur",
          });

          const stripeToken = stripeResponse.token.id;

          if (stripeResponse.error) {
            alert(stripeResponse.error.message);
          } else {
            // Stripe nous retourne un token
            console.log("stripeResponse.token", stripeResponse.token);

            //
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
        Valider
      </button>
    </div>
  ) : (
    <span>Purchase Complete</span>
  );
};

export default injectStripe(CheckoutForm);
