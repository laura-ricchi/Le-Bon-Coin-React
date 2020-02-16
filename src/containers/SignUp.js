import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// SignUp : page de création de compte

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  return (
    <div className="main-register">
      <h2>Créez un compte</h2>
      <form
        onSubmit={async event => {
          event.preventDefault();

          if (password === confirmPassword) {
            try {
              const response = await axios.post(
                " https://leboncoin-api.herokuapp.com/api/user/sign_up",
                {
                  username,
                  email,
                  password: password
                }
              );

              console.log(response.data);

              if (response.data.token) {
                const token = response.data.token;

                Cookies.set("userToken", token, { expires: 2000 });
                setUser({
                  token: token
                });

                history.push("/");
              }
            } catch (error) {
              alert("An error occured");
              console.log("error.message = ", error);
            }
          }
        }}
      >
        <p>Pseudo *</p>
        <input
          type="text"
          value={username}
          onChange={event => {
            setUsername(event.target.value);
          }}
        />
        <p>Adresse mail *</p>
        <input
          type="email"
          value={email}
          onChange={event => {
            setEmail(event.target.value);
          }}
        />
        <p>Mot de passe *</p>
        <input
          type="password"
          value={password}
          onChange={event => {
            setPassword(event.target.value);
          }}
        />
        <p>Confirmer le mot de passe *</p>
        <input
          type="password"
          value={confirmPassword}
          onChange={event => {
            setConfirmPassword(event.target.value);
          }}
        />
        <div>
          <input type="checkbox" className="checkbox" />
          <span>
            J’accepte les Conditions Générales de Vente et les Conditions
            Générales d'Utilisation
          </span>
        </div>

        <input type="submit" value="Créer mon Compte Personnel" />
      </form>

      <div className="main-text">
        <div>
          <h2>Pourquoi créer un compte ?</h2>
          <div className="icon-clock">
            <FontAwesomeIcon icon={faClock} />
          </div>
          <h3>Gagnez du temps </h3>
          <p>
            Publiez vos annonces rapidement, avec vos informations pré-remplies
            chaque fois que vous souhaitez déposer une nouvelle annonce.
          </p>
        </div>
        <div>
          <div className="icon-bell">
            <FontAwesomeIcon icon={faBell} />
          </div>
          <h3>Soyez les premiers informés</h3>

          <p>
            Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce qui
            vous intéresse.
          </p>
        </div>
        <div>
          <div className="icon-eye">
            <FontAwesomeIcon icon={faEye} />
          </div>
          <h3>Visibilité</h3>
          <p>
            Suivez les statistiques de vos annonces (nombre de fois où votre
            annonce a été vue, nombre de contacts reçus)
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
