import React, { Component } from "react";
import "../css/login.css";
import { register } from "./../services/registerService";

class RegisterForm extends Component {
  state = {
    data: { name: "", username: "", password: "" },
  };

  handlePost = async () => {
    try {
      const { data } = this.state;
      const response = await register(data.name, data.username, data.password);
      localStorage.setItem("token", response.headers["x-auth-token"]);
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
    data.name = event.target.value;
    this.setState({ data });
  };
  handleChange2 = (event) => {
    const data = { ...this.state.data };
    data.username = event.target.value;
    this.setState({ data });
  };
  handleChange3 = (event) => {
    const data = { ...this.state.data };
    data.password = event.target.value;
    this.setState({ data });
  };
  render() {
    return (
      <div className="body">
        <h1 className="heading">Register</h1>
        <form className="inputs" onSubmit={this.handleSubmit}>
          <ul>
            <li className="list-item">
              <input
                type="text"
                placeholder="name"
                className="input input-field"
                onChange={this.handleChange1}
                value={this.state.data.name}
              />
            </li>
            <li className="list-item">
              <input
                type="username"
                placeholder="username"
                className="input input-field"
                onChange={this.handleChange2}
                value={this.state.data.username}
              />
            </li>
            <li className="list-item">
              <input
                className="input input-field"
                type="password"
                placeholder="password"
                onChange={this.handleChange3}
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

export default RegisterForm;
