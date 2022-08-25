import React, { Component } from "react";
import "../css/login.css";
import { register } from "./../services/registerService";
import { Navigate } from "react-router-dom";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    redirect: false,
    data: { name: "", username: "", password: "" },
    errors: { username: "", name: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const response = await register(data.name, data.username, data.password);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      const errors = { ...this.state.errors };
      errors.username = "";
      this.setState({ errors });
      this.setState({ redirect: !this.state.redirect });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="body">
        <h1 className="heading">Register</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
            <li className="list-item">
              <input
                name="name"
                type="text"
                placeholder="name"
                className="input input-field"
                onChange={this.handleChange}
                value={this.state.data.name}
              />
            </li>
            <li className="list-item">
              <label className="error label">{this.state.errors.name}</label>
            </li>
            <li className="list-item">
              <input
                name="username"
                type="username"
                placeholder="username"
                className="input input-field"
                onChange={this.handleChange}
                value={this.state.data.username}
              />
            </li>
            <li className="list-item">
              <label className="error label">
                {this.state.errors.username}
              </label>
            </li>
            <li className="list-item">
              <input
                name="password"
                className="input input-field"
                type="password"
                placeholder="password"
                onChange={this.handleChange}
                value={this.state.data.password}
              />
            </li>
            <li className="list-item">
              <button className="input blue" type="submit">
                {this.state.redirect && <Navigate to="/admin" replace={true} />}
                Register
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
