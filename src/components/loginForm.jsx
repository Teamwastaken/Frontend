import React, { Component } from "react";
import "../css/login.css";
import axios from "axios";
import config from "../config/config.json";

class LoginForm extends Component {
  state = {
    data: { username: "", password: "" },
  };
  componentDidMount() {}
  handlePost = async () => {
    const obj = {
      email: this.state.data.username,
      password: this.state.data.password,
    };

    try {
      const { data: jwt } = await axios.post(config.apiUrl + "/api/auth", obj);
      localStorage.setItem("token", jwt);
    } catch (ex) {
      alert(ex);
    }
  };
  doSubmit = (event) => {
    event.preventDefault();
  };
  handleChange1 = (event) => {
    const data = { ...this.state.data };
    data.username = event.target.value;
    this.setState({ data });
  };
  handleChange2 = (event) => {
    const data = { ...this.state.data };
    data.password = event.target.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="body">
        <h1 className="heading">Login</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
            <li className="list-item">
              <input
                type="username"
                placeholder="username"
                className="input input-field"
                onChange={this.handleChange1}
                value={this.state.data.username}
              />
            </li>
            <li className="list-item">
              <input
                className="input input-field"
                type="password"
                placeholder="password"
                onChange={this.handleChange2}
                value={this.state.data.password}
              />
            </li>
            <li className="list-item">
              <button
                className="input blue"
                type="submit"
                onClick={() => this.handlePost()}
              >
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
