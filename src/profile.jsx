import React, { Component } from "react";
import axios from "axios";
import config from "./config/config.json";
import { Navigate } from "react-router-dom";

class Profile extends Component {
  state = { user: {}, redirect: false };
  async componentDidMount() {
    //get data for participants
    try {
      const headers = {
        "x-auth-token": await localStorage.getItem("token"),
      };
      const { data: user } = await axios.get(config.apiUrl + "/api/user/me", {
        headers: headers,
      });

      this.setState({ user });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  }

  render() {
    if (localStorage.getItem("logedIn") !== "true")
      return <Navigate to='/login' replace={true} />;
    return (
      <div>
        <h1>{this.state.user.name}</h1>
        <h2>
          {this.state.user.email}
          {this.state.user.emailConfirmed ? "(confirmed)" : " (not confirmed)"}
        </h2>
      </div>
    );
  }
}

export default Profile;
