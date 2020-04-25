import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import "../App.css";
import "../assets/css/LogIn.css";

const LogIn = ({ onLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container">
      <Helmet>
        <title>Se connecter à votre compte</title>
      </Helmet>
      <div className="container-form-login">
        <div className="form-login">
          <h1>Connexion</h1>
          <hr></hr>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                const response = await axios.post(
                  "https://my-project-backend-leboncoin.herokuapp.com/login",
                  {
                    email,
                    password,
                  }
                );

                // si le token est récupéré lors de la requête sur le backend
                if (response.data.token) {
                  console.log("response.data =", response.data);
                  // met à jour la variable onLogin
                  onLogin(response.data.token, response.data.account.username);
                  // et aller sur la page d'accueil - Changement de page - avec le token de l'user
                  history.push("/");
                  // sinon afficher un message d'erreur
                } else {
                  alert("Token is missing");
                }
              } catch (error) {
                alert("Identifiants incorrects");
              }
            }}
          >
            <div className="form-login">
              <h4>Adresse mail</h4>
              <input
                className="input-login"
                type="email"
                value={email}
                onChange={(event) => {
                  const value = event.target.value;
                  setEmail(value);
                }}
              />
              <h4>Mot de passe</h4>
              <input
                className="input-login"
                type="password"
                value={password}
                onChange={(event) => {
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
                  onClick={() => history.push("/signup")}
                  value="Créer un compte"
                  type="button"
                  className="create-account"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
