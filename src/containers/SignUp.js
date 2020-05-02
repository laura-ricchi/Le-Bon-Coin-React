import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";
import "../App.css";
import "../assets/css/SignUp.css";

// SignUp : page de création de compte

const SignUp = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const history = useHistory();

  const handleSignUpSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        alert("Vos mots de passe ne sont pas identiques");
      }
      const response = await axios.post(
        " https://my-project-backend-leboncoin.herokuapp.com/signup",
        {
          email,
          username,
          password,
        }
      );
      console.log(response.data);

      if (response.data.token) {
        onLogin(response.data.token, response.data.account.username);

        history.push("/");
      }
    } catch (error) {
      alert("An error occured");
      console.log("error.message = ", error);
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Créez votre compte</title>
      </Helmet>
      <div className="main-container-signup">
        <div className="container-signup">
          <div className="container-why-create-account">
            <div className="title-create-account">
              Pourquoi créer un compte ?
            </div>
            <div className="text-block">
              <div className="icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <div className="text-reason">
                <h4>Gagnez du temps </h4>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>

            <div className="text-block">
              <div className="icon">
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div className="text-reason">
                <h4>Soyez les premiers informés</h4>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l’annonce qui vous intéresse.
                </p>
              </div>
            </div>

            <div className="text-block">
              <div className="icon">
                <FontAwesomeIcon icon={faEye} />
              </div>
              <div className="text-reason">
                <h4>Visibilité</h4>
                <p>
                  Suivez les statistiques de vos annonces (nombre de fois où
                  votre annonce a été vue, nombre de contacts reçus)
                </p>
              </div>
            </div>
          </div>

          <div className="container-form-signup">
            <form onSubmit={handleSignUpSubmit}>
              <div className="create-account-signup">Créer un compte</div>
              <hr></hr>
              <div className="input-create-account">
                <h5>Pseudo *</h5>
                <input
                  className="input-signup"
                  type="text"
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <h5>Adresse mail *</h5>
                <input
                  className="input-signup"
                  type="text"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <h5>Mot de passe *</h5>
                <input
                  className="input-signup"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <h5>Confirmer le mot de passe *</h5>
                <input
                  className="input-signup"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>

              <div className="checkbox-input">
                <input
                  onChange={() => setCheckbox(!checkbox)}
                  type="checkbox"
                />
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
    </div>
  );
};
export default SignUp;
