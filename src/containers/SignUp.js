import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import "../assets/css/SignUp.css";

// SignUp : page de création de compte

const SignUp = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const history = useHistory();

  const handleSignUpSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!username || !email || !password || !confirmPassword || !checkbox) {
        alert("Merci de remplir tous les champs");
      } else if (password !== confirmPassword) {
        alert("Vos mots de passe ne sont pas identiques");
      } else if (!checkbox) {
        alert("Merci de cocher les CGV et CGU");
      } else {
        const response = await axios.post(
          " https://my-project-backend-leboncoin.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            password: password,
          }
        );

        console.log(response.data);

        if (response.data.token) {
          const token = response.data.token;

          Cookies.set("userToken", token, { expires: 2000 });
          setUser({
            token: token,
          });

          history.push("/");
        }
      }
    } catch (error) {
      alert("An error occured");
      console.log("error.message = ", error);
    }
  };

  return (
    <div className="main-container-signup">
      <div className="container-signup">
        <Helmet>
          <title>Créez votre compte</title>
        </Helmet>

        <div className="container-why-create-account">
          <div>
            <div className="title-create-account">
              Pourquoi créer un compte ?
            </div>
            <div className="text-block">
              <div className="icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="text-reason">
                <h3>Gagnez du temps </h3>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
          </div>

          <div className="text-block">
            <div className="icon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="text-reason">
              <h3>Soyez les premiers informés</h3>
              <p>
                Créez des alertes Immo ou Emploi et ne manquez jamais l’annonce
                qui vous intéresse.
              </p>
            </div>
          </div>

          <div className="text-block">
            <div className="icon">
              <FontAwesomeIcon icon={faEye} />
            </div>
            <div className="text-reason">
              <h3>Visibilité</h3>
              <p>
                Suivez les statistiques de vos annonces (nombre de fois où votre
                annonce a été vue, nombre de contacts reçus)
              </p>
            </div>
          </div>
        </div>

        <div className="container-form-signup">
          <form onSubmit={handleSignUpSubmit}>
            <div className="create-account-signup">Créer un compte</div>
            <hr></hr>
            <div className="input-create-account">
              <p>Pseudo *</p>
              <input
                className="input-signup"
                type="text"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <p>Adresse mail *</p>
              <input
                className="input-signup"
                type="email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <p>Mot de passe *</p>
              <input
                className="input-signup"
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <p>Confirmer le mot de passe *</p>
              <input
                className="input-signup"
                type="password"
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </div>

            <div className="checkbox-input">
              <input onChange={() => setCheckbox(!checkbox)} type="checkbox" />
              <p>
                « J’accepte les <span>Conditions Générales de Vente </span>et
                les <span>Conditions Générales d'Utilisation</span> »
              </p>
            </div>
            <input
              type="submit"
              value="Créer mon Compte Personnel"
              className="button-create-account"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
