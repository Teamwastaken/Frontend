import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ranking from "./ranking";
import VoteWrapper from "./Vote";
import VoteWrapperLs from "./VoteLSj";
import Admin from "./admin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/voting/:id" element={<VoteWrapper />} />
      <Route path="/voting/:id/noLocalStorage" element={<VoteWrapperLs />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
