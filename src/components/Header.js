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
      <div className="container">
        <div className="logo-leboncoin">
          <Link to="/">
            <img src={logo} className="logo" alt="logo" />
          </Link>
        </div>
        <div className="button-new-offer hidden-xs-header">
          <Link to="/offers/publish" style={{ textDecoration: "none" }}>
            <button className="create-offer">
              <FontAwesomeIcon icon={faPlusSquare} className="icon-plus" />
              Déposer une annonce
            </button>
          </Link>
        </div>
        <div className="search hidden-xs-header">
          <FontAwesomeIcon icon={faSearch} className="icon-search" />
          <Link to="/" className="link-search">
            Rechercher
          </Link>
        </div>
        <div className="buttons-header hidden-sm-header hidden-xs-header">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
