import React from "react";
import "../css/login.css";
import { Navigate } from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: { username: "" },
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/admin";
    } catch (ex) {
      if ((ex.response && ex.response.status === 400) || 403) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        localStorage.setItem("logedIn", false);
      }
    }
  };
  render() {
    if (localStorage.getItem("logedIn") === "true")
      return <Navigate to='/admin' replace={true} />;
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
