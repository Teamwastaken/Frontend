import React from "react";
import auth from "../services/authService";
import "../css/login.css";
import { register } from "./../services/userService";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { name: "", username: "", password: "" },
    errors: { username: "", name: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const response = await register(data.name, data.username, data.password);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      const errors = { ...this.state.errors };
      errors.username = "";
      this.setState({ errors });
      window.location = "/login";
    } catch (ex) {
      if (
        ex.response &&
        ex.response.data === '"Name" is not allowed to be empty'
      ) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        this.setState({ errors });
        return;
      }
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = null;
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
      <div className='body'>
        <h1 className='heading'>Register</h1>
        <form className='form-items' onSubmit={this.handleSubmit}>
          <div className='form-items'>{this.renderInput("name", "Name")}</div>
          <div className='form-items'>
            {this.renderInput("username", "Username")}
          </div>

          <div className='form-items'>
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className='form-items button-container'>
            <button className='button blue' type='submit'>
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
