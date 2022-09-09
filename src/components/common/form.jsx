import React, { Component } from "react";
import Input from "./input";
//import { Navigate } from "react-router-dom";

class Form extends Component {
  state = {
    redirect: false,
    data: {},
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.doSubmit();
    this.setState({ popup1: false, popup2: false, popup3: false });
  };
  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    if (input.name === "password" || input.name === "name") {
      data[input.name] = input.value;
    } else {
      data[input.name] = input.value.toLowerCase();
    }
    this.setState({ data });
  };

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        onChange={this.handleChange}
        value={data[name]}
        error={errors[name]}
        label={label}
      />
    );
  }
}

export default Form;
