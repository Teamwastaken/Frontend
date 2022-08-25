import React from "react";
import "../css/login.css";
import { login } from "../services/authService";
import { Navigate } from "react-router-dom";
import Form from "./common/form";

class LoginForm extends Form {
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

  render() {
    return (
      <div className="body">
        <h1 className="heading">Login</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
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
