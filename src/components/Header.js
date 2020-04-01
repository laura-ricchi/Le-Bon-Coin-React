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

const Header = ({ user, setUser }) => {
  const history = useHistory();

  return (
    <header>
      <Link to="/">
        <img src={logo} className="logo" alt="logo" />
      </Link>
      <Link to="/offer/publish" style={{ textDecoration: "none" }}>
        <button className="create-offer">
          <div className="icon-plus">
            <FontAwesomeIcon icon={faPlusSquare} />
            Déposer une annonce
          </div>
        </button>
      </Link>
      <div className="search">
        <div className="icon-search">
          <FontAwesomeIcon icon={faSearch} />
        </div>
        Rechercher
      </div>

      {user === null ? (
        <Link to="/log_in" style={{ textDecoration: "none" }}>
          <div className="login">
            <div className="icon-user">
              <FontAwesomeIcon icon={faUser} />
            </div>
            Se connecter
          </div>
        </Link>
      ) : (
        <div
          className="deconnect"
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
          <div className="icon-user">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <span>Se déconnecter</span>
        </div>
      )}
    </header>
  );
};

export default Header;
