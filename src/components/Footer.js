import React from "react";
import "../App.css";
import "../assets/css/Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <span>
          Réplique du site Le Bon Coin réalisée avec
          <a href="https://fr.reactjs.org/"> React</a> par
        </span>
        <a href="https://www.linkedin.com/in/lauraricchi/"> Laura Ricchi</a>
      </div>
    </footer>
  );
};
export default Footer;
