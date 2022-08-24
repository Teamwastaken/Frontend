import React, { Component } from "react";
import "../css/login.css";
import { login } from "../services/authService";
import { Navigate } from "react-router-dom";

class LoginForm extends Component {
  state = {
    redirect: false,
    data: { username: "", password: "" },
    errors: { username: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
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
  handleSubmit = (event) => {
    event.preventDefault();
    this.handlePost();
  };
  handleChange1 = (event) => {
    const data = { ...this.state.data };
    data.username = event.target.value.toLowerCase();
    this.setState({ data });
  };
  handleChange2 = (event) => {
    const data = { ...this.state.data };
    data.password = event.target.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="body">
        <h1 className="heading">Login</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
            <li className="list-item">
              <input
                type="username"
                placeholder="username"
                className="input input-field"
                onChange={this.handleChange1}
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
                onChange={this.handleChange2}
                value={this.state.data.password}
              />
            </li>
            <li className="list-item">
              <button className="input blue" type="submit">
                {this.state.redirect && <Navigate to="/admin" replace={true} />}
                Login
              </button>
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default LoginForm;
