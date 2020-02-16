import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/img/logo.svg";
import "../assets/css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const Header = ({ user, setUser }) => {
  const history = useHistory();

  return (
    <header>
      <img src={logo} className="logo" alt="logo" />
      <div className="icon-plus">
        <FontAwesomeIcon icone={faPlusSquare} />
        <button className="create-offer">Déposer une annonce</button>
      </div>
      <form>
        <div className="icon-search">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Rechercher"></input>
        </div>
      </form>
      {user === null ? (
        <Link to="/log_in">Se connecter</Link>
      ) : (
        <button
          onClick={() => {
            // Déconnexion
            // Suppression du cookie userToken
            Cookies.remove("userToken");
            // Mettre l'état user à null
            setUser(null);
            // Aller sur la page d'accueil
            history.push("/");
          }}
        >
          Se déconnecter
        </button>
      )}
    </header>
  );
};

export default Header;
