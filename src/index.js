import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "gestalt/dist/gestalt.css";
import "./styles/main.scss";

import Navbar from "./components/Navbar";
import App from "./components/App";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Checkout from "./components/Checkout";

const Root = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route component={App} path="/" exact />
        <Route component={Signin} path="/signin" />
        <Route component={Signup} path="/signup" />
        <Route component={Checkout} path="/checkout" />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
