import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ranking from "./ranking";
import VoteWrapper from "./Vote";
import VoteWrapperLs from "./VoteLSj";
import Admin from "./admin";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CurrentVoting from "./currentVoting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/currentVoting" element={<CurrentVoting />} />
      <Route path="/voting/:id" element={<VoteWrapper />} />
      <Route path="/voting/:id/noLocalStorage" element={<VoteWrapperLs />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  </BrowserRouter>
);
