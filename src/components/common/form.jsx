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
        placeholder={`Enter ${label} here`}
      />
    );
  }
}

export default Form;
