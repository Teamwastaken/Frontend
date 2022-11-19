import React from "react";
import "../css/login.css";
import axios from "axios";
import Form from "./common/form";
import config from "../config/config.json";

class ResetPassword extends Form {
  state = {
    data: { email: "" },
    errors: { username: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const apiEndpoint = config.apiUrl + "/api/user/resetPassword";
      await axios.post(apiEndpoint, { email: data.email });
      const errors = { ...this.state.errors };
      errors.username = "";
      this.setState({ errors });
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
      <div className='body'>
        <h1 className='heading'>Your Email Adresse</h1>
        <form className='form-items' onSubmit={this.handleSubmit}>
          <div className=''>{this.renderInput("email", "Email")}</div>
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

export default ResetPassword;
