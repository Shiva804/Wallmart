import React from "react";
import ReactDOM from "react-dom";
import Login from "./Components/Login";
import App from "./App";
import RetailerDetails from "./Components/RetailerDetails";

import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import NotValidated from "./Components/NotValidated";

const Routing = (
  <Router>
    <div id="routing-container">
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route path="/signup" exact component={Signup}></Route>
        <Route
          path="/retailerDetails"
          exact
          component={RetailerDetails}
        ></Route>
        <Route path="/notValidated" exact component={NotValidated}></Route>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(Routing, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
