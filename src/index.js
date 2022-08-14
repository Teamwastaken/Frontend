import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Ranking from "./ranking";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ranking" element={<Ranking />} />
    </Routes>
  </BrowserRouter>
);
