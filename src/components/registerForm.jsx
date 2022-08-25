import React from "react";
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
  doSubmit = () => {
    this.handlePost();
  };
  render() {
    return (
      <div className="body">
        <h1 className="heading">Register</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
            <li className="list-item">{this.renderInput("name", "Name")}</li>

            <li className="list-item">
              <label className="error label">{this.state.errors.name}</label>
            </li>
            <li className="list-item">
              {this.renderInput("username", "Username")}
            </li>

            <li className="list-item">
              {this.renderInput("password", "Password", "password")}
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
