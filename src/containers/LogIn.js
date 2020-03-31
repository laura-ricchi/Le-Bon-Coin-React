import React, { useState } from "react";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../assets/css/LogIn.css";

const LogIn = props => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Helmet>
        <title>Se connecter</title>
      </Helmet>
      <div className="container-form-login">
        <div className="form-login">
          <h1>Connexion</h1>
          <hr></hr>
          <form
            onSubmit={async event => {
              event.preventDefault();
              try {
                const response = await axios.post(
                  "https://leboncoin-api.herokuapp.com/api/user/log_in",
                  {
                    email,
                    password
                  }
                );

                if (response.data.token) {
                  console.log("response.data =", response.data);

                  //Appel du serveur pour transmettre un email et un mdp pour obtenir un token
                  const token = response.data.token;

                  // Sauvegarder le token dans les cookies
                  Cookies.set("userToken", token, { expires: 2000 });

                  // Remplacer le bouton "Se connecter" par "Se déconnecter"
                  props.setUser({
                    token: token
                  });
                  // Aller sur la page d'accueil
                  // Changement de page
                  history.push("/");
                } else {
                  alert("Token is missing");
                }
              } catch (error) {
                alert("Identifiants incorrects");
              }
            }}
          >
            <div className="form-login">
              <p>Adresse mail</p>
              <input
                className="input-login"
                type="email"
                value={email}
                onChange={event => {
                  const value = event.target.value;
                  setEmail(value);
                }}
              />
              <p>Mot de passe</p>
              <input
                className="input-login"
                type="password"
                value={password}
                onChange={event => {
                  const value = event.target.value;
                  setPassword(value);
                }}
              />
              <button className="button-submit" type="submit">
                Se connecter
              </button>
              <div className="no-account">
                <p>Vous n'avez pas de compte ?</p>

                <input
                  onClick={() => history.push("/sign_up")}
                  value="Créer un compte"
                  type="button"
                  className="create-account"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
