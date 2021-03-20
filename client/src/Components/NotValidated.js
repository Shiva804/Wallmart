import React, { Component } from "react";

export default class NotValidated extends Component {
  render() {
    return (
      <div>
        Please wait until your documents are being validated...!
        <br />
        <button
          onClick={() => {
            this.props.history.push("/");
          }}
        >
          Go back to login page !
        </button>
      </div>
    );
  }
}
