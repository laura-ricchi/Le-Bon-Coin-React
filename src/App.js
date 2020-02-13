import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import logo from "./img/logo.svg";

function App() {
  return (
    <Router>
      <header>
        <img src={logo} className="logo" alt="logo" />
        <button className="create-offer">Déposer une annonce</button>
        <form>
          <input type="text" placeholder="Loupe + Rechercher"></input>
        </form>
        <button>Se connecter</button>
        <form>
          <input
            type="text"
            // value={offers}
            placeholder="Que Recherchez-vous?"
            // onChange
          />
          <button>Rechercher</button>
        </form>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/offers">Offers</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Offers />
        </Route>
      </Switch>
      <footer>Made by Laura @ LeReacTeuR</footer>
    </Router>
  );
}

export default App;
