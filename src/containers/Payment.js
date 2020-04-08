import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";

const CheckoutForm = ({ stripe }) => {
  const [complete, setComplete] = useState(false);

  return !complete ? (
    <div className="checkout">
      <p>Souhaitez-vous terminer l'achat? </p>
      <CardElement />

      <button
        onClick={async (event) => {
          const stripeResponse = await stripe.createToken({
            name: "Identifiant de l'acheteur",
          });

          const stripeToken = stripeResponse.token.id;

          if (stripeResponse.error) {
            alert(stripeResponse.error.message);
          } else {
            console.log("stripeResponse.token", stripeResponse.token);

            const paymentResponse = await axios.post(
              "https://localhost:3002/payment",
              {
                stripeToken: stripeToken,
              }
            );
            console.log("paymentResponse", paymentResponse);

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
