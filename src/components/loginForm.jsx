import React, { Component } from "react";
import "../css/login.css";
import { login } from "../services/authService";

class LoginForm extends Component {
  state = {
    data: { username: "", password: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response.data);
      }
    }
  };
  handleSubmit = (event) => {
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
