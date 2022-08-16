import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ranking from "./ranking";
import VoteWrapper from "./Vote";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/voting/:id" element={<VoteWrapper />} />
    </Routes>
  </BrowserRouter>
);
