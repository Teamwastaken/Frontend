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
  doSubmit = () => {
    this.handlePost();
  };
  render() {
    return (
      <div className="body">
        <h1 className="heading">Login</h1>
        <form className="form-items" onSubmit={this.handleSubmit}>
          <div className="">{this.renderInput("username", "Username")}</div>

          <div className="form-items">
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className="form-items button-container">
            <button className="button blue" type="submit">
              {this.state.redirect && <Navigate to="/admin" replace={true} />}
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
