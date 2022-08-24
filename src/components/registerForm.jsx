import React, { Component } from "react";
import "../css/login.css";
import { register } from "./../services/registerService";
import { Navigate } from "react-router-dom";

class RegisterForm extends Component {
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
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.handlePost();
  };
  handleChange1 = (event) => {
    const data = { ...this.state.data };
    data.name = event.target.value;
    this.setState({ data });
  };
  handleChange2 = (event) => {
    const data = { ...this.state.data };
    data.username = event.target.value.toLowerCase();
    this.setState({ data });
  };
  handleChange3 = (event) => {
    const data = { ...this.state.data };
    data.password = event.target.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="body">
        <h1 className="heading">Register</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
            <li className="list-item">
              <input
                type="text"
                placeholder="name"
                className="input input-field"
                onChange={this.handleChange1}
                value={this.state.data.name}
              />
            </li>
            <li className="list-item">
              <label className="error label">{this.state.errors.name}</label>
            </li>
            <li className="list-item">
              <input
                type="username"
                placeholder="username"
                className="input input-field"
                onChange={this.handleChange2}
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
                className="input input-field"
                type="password"
                placeholder="password"
                onChange={this.handleChange3}
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
