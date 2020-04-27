import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/img/logo.svg";
import "../App.css";
import "../assets/css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = ({ token, setToken, username }) => {
  const history = useHistory();

  return (
    <header>
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <Link to="/offers/publish" style={{ textDecoration: "none" }}>
        <button className="create-offer">
          <FontAwesomeIcon icon={faPlusSquare} className="icon-plus" />
          Déposer une annonce
        </button>
      </Link>
      <div className="search">
        <FontAwesomeIcon icon={faSearch} className="icon-search" />
        Rechercher
      </div>

      {token === null ? (
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div className="login">
            <FontAwesomeIcon icon={faUser} className="icon-user" />
            Se connecter
          </div>
        </Link>
      ) : (
        <div
          className="deconnect"
          onClick={() => {
            // Mise à jour du state setToken => déconnexion
            setToken(null);
            // Suppression du cookie "token"
            Cookies.remove("token");
            // Suppression du cookie "username"
            Cookies.remove("username");
            // Aller sur la page d'accueil
            history.push("/");
          }}
        >
          <FontAwesomeIcon icon={faUser} className="icon-user" />
          <span>{username}</span>
          <span>Se déconnecter</span>
        </div>
      )}
    </header>
  );
};

export default Header;
