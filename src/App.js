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
import Footer from "./components/Footer";
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
    // enregistement des données par le navigateur du nom et la valeur des cookies ainsi que la date d'expiration exprimée en jours
    Cookies.set("token", token, { expires: 2000 });
    Cookies.set("username", username, { expires: 2000 });
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
        <Route exact path="/offer/:id">
          <Offer />
        </Route>
        <Route exact path="/offers/publish">
          <Publish />
        </Route>
        <Route path="/payment">
          <Payment username={username} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
