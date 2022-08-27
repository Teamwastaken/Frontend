import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Ranking from "./ranking";

import VoteWrapperLs from "./VoteLSj";
import Admin from "./admin";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import CurrentVotingDiagram from "./currentVotingDiagramm";
import CurrentVoting from "./currentVoting";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/currentVoting" replace />} />
      <Route path="/currentVoting" element={<CurrentVoting />} />
      <Route path="/currentVoting/diagram" element={<CurrentVotingDiagram />} />
      <Route path="/voting/:id/noLocalStorage" element={<VoteWrapperLs />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  </BrowserRouter>
);
