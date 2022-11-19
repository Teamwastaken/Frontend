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
      if (
        ex.response &&
        ex.response.data === '"Name" is not allowed to be empty'
      ) {
        console.log("name");
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
              {this.state.redirect && (
                <Navigate to='/myProfile' replace={true} />
              )}
              Register
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
