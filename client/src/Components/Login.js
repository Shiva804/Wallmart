import axios from "../config";
import React, { Component } from "react";

export default class Login extends Component {
  submitLogin = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const authenticate = await axios.post("/authenticate", {
      email: email,
      password: password,
    });

    console.log(authenticate);

    if (authenticate.data) {
      //redirect to dashboard...
    } else {
      this.props.history.push("/notValidated");
    }
  };

  render() {
    return (
      <div>
        <input type="text" id="email" />
        <input type="password" id="password" />
        <input
          type="submit"
          id="submit"
          onClick={() => {
            this.submitLogin();
          }}
        />
      </div>
    );
  }
}
