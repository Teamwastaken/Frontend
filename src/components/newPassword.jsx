import React from "react";
import config from "../config/config.json";
import { useParams } from "react-router-dom";
import "../css/login.css";
import axios from "axios";
import Form from "./common/form";

function NewPasswordRapper() {
  let params = useParams();
  return <NewPassword token={params.token} />;
}

class NewPassword extends Form {
  state = {
    data: { password: "" },
    errors: { password: "" },
    redirect: false,
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const apiEndpoint =
        config.apiUrl + "/api/user/resetPassword/" + this.props.token;
      await axios.post(apiEndpoint, { password: data.password });
      window.location = "/login";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
      }
    }
  };
  doSubmit = () => {
    this.handlePost();
  };
  render() {
    return (
      <div className='body'>
        <h1 className='heading'>Your new password</h1>
        <form className='form-items' onSubmit={this.handleSubmit}>
          <div className=''>
            {" "}
            {this.renderInput("password", "Password", "password")}
          </div>
          <div className='form-items button-container'>
            <button className='button blue' type='submit'>
              Set New Password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewPasswordRapper;
