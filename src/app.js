import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./profile";
import ResetPassword from "./components/resetPassword";
import NewPasswordRapper from "./components/newPassword";
import Navigation from "./Navigation";
import jwtDecode from "jwt-decode";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <BrowserRouter>
        <Navigation user={this.state.user} />
        <Routes>
          <Route path='/' element={<Navigate to='/login' replace />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route
            path='/myProfile'
            element={<Profile user={this.state.user} />}
          />
          <Route path='/resetPassword' element={<ResetPassword />} />
          <Route path='/newPassword/:token' element={<NewPasswordRapper />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
