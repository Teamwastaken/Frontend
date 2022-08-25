import React, { Component } from "react";
//import { Navigate } from "react-router-dom";

class Form extends Component {
  state = {
    redirect: false,
    data: {},
    errors: {},
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handlePost();
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    if (input.name === "password") {
      data[input.name] = input.value;
    } else {
      data[input.name] = input.value.toLowerCase();
    }
    this.setState({ data });
  };
}

export default Form;
