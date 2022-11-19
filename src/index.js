import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Profile from "./profile";
import ResetPassword from "./components/resetPassword";
import NewPasswordRapper from "./components/newPassword";
import Navigation from "./Navigation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace />} />
      <Route path='/login' element={<LoginForm />} />
      <Route path='/register' element={<RegisterForm />} />
      <Route path='/myProfile' element={<Profile />} />
      <Route path='/resetPassword' element={<ResetPassword />} />
      <Route path='/newPassword/:token' element={<NewPasswordRapper />} />
    </Routes>
  </BrowserRouter>
);
