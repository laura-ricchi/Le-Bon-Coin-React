import React from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/img/logo.svg";
import "../App.css";
import "../assets/css/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHeart,
  faPlusSquare,
  faUser,
  faBell,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ token, setToken, username }) => {
  const history = useHistory();

  return (
    <header>
      <div className="logo-leboncoin">
        <Link to="/">
          <img src={logo} className="logo" alt="logo" />
        </Link>
      </div>
      <div className="buttons-header">
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
        <div className="search-offers">
          <FontAwesomeIcon icon={faBell} />
          Mes recherches
        </div>
        <div className="favorites">
          <FontAwesomeIcon icon={faHeart} />
          Favoris
        </div>
        <div className="comment">
          <FontAwesomeIcon icon={faCommentDots} />
          Messages
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
      </div>
    </header>
  );
};

export default Header;
