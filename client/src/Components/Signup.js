import React, { Component } from "react";
import axios from "../config";
export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      type: "customer",
    };
  }

  selectType = (e) => {
    this.setState({ type: e.target.value });
  };

  submitForm = async () => {
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const type = this.state.type;

    const register = await axios.post("/register", {
      email: email,
      username: username,
      password: password,
      type: type,
    });

    if (type == "customer") this.props.history.push("/");
    if (type == "retailer") this.props.history.push("/retailerDetails");
  };

  render() {
    return (
      <div>
        <div>
          email
          <input type="text" id="email" />
          username
          <input type="text" id="username" />
          password
          <input type="password" id="password" />
          <label for="customer">Customer</label>
          <input
            type="radio"
            name="type"
            value="customer"
            defaultChecked
            onChange={(e) => {
              this.selectType(e);
            }}
          />
          <label for="retailer">Retailer</label>
          <input
            type="radio"
            name="type"
            value="retailer"
            onChange={(e) => {
              this.selectType(e);
            }}
          />
          <input
            type="submit"
            id="submit"
            onClick={() => {
              this.submitForm();
            }}
          />
        </div>
      </div>
    );
  }
}
