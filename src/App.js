import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Payment from "./containers/Payment";
import Publish from "./containers/Publish";
import Header from "./components/Header";
import Cookies from "js-cookie";

function App() {
  // Création de 2 states pour accéder à la valeur des cookies "token" et "username"
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || "");

  // création d'une variable onLogin
  const onLogin = (token, username) => {
    // mise à jour des states
    setToken(token);
    setUsername(username);
    // enregistement des données par le navigateur du nom et la valeur des cookies
    Cookies.set("token", token);
    Cookies.set("username", username);
  };

  return (
    <Router>
      <Header token={token} setToken={setToken} username={username} />
      <Switch>
        <Route exact path="/">
          <Offers />
        </Route>
        <Route path="/login">
          <LogIn onLogin={onLogin} />
        </Route>
        <Route path="/signup">
          <SignUp onLogin={onLogin} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/offer/publish">
          <Publish />
        </Route>
        <Route path="/payment">
          <Payment />
        </Route>
      </Switch>
      <footer>Made by Laura @ LeReacTeuR </footer>
    </Router>
  );
}

export default App;
