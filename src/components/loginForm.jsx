import React from "react";
import "../css/login.css";
import { login } from "../services/authService";
import { Navigate } from "react-router-dom";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: { username: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
      localStorage.setItem("logedIn", true);
      window.location = "/myProfile";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        localStorage.setItem("logedIn", false);
      }
    }
  };
  doSubmit = () => {
    this.handlePost();
  };
  render() {
    if (localStorage.getItem("logedIn") === "true")
      return <Navigate to='/myProfile' replace={true} />;
    return (
      <div className='body'>
        <h1 className='heading'>Login</h1>
        <form className='form-items' onSubmit={this.handleSubmit}>
          <div className=''>{this.renderInput("username", "Username")}</div>

          <div className='form-items'>
            {this.renderInput("password", "Password", "password")}
          </div>

          <div className='form-items'>
            <div className='input-container'>
              {" "}
              <a href='/resetPassword' className='label'>
                Reset Password
              </a>
            </div>
          </div>

          <div className='form-items button-container'>
            <button className='button blue' type='submit'>
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;
