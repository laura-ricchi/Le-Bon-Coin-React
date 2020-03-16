import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Offer from "./containers/Offer";
import Offers from "./containers/Offers";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Publish from "./containers/Publish";
import Header from "./components/Header";
import Cookies from "js-cookie";

// import { Elements, StripeProvider } from "react-stripe-elements";
// import CheckoutForm from "./containers/Payment";

function App() {
  const tokenFromCookie = Cookies.get("userToken");

  let newState;
  if (tokenFromCookie) {
    newState = { token: tokenFromCookie };
  } else {
    newState = null;
  }

  const [user, setUser] = useState(newState);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Switch>
        {/* <Route path="/payment">
          <Payment stripe={stripe} />
        </Route> */}
        <Route path="/offer/publish">
          <Publish setUser={setUser} />
        </Route>
        <Route path="/log_in">
          <LogIn setUser={setUser} />
        </Route>
        <Route path="/sign_up">
          <SignUp setUser={setUser} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Offers />
        </Route>
      </Switch>
      <footer>Made by Laura @ LeReacTeuR </footer>
    </Router>
  );
}

export default App;
