import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./home";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Ranking from "./ranking";
import Vote from "./Vote";

const Wrapper = (props) => {
  const params = useParams();
  return <Vote {...{ ...props, match: { params } }} />;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/voting/:id" element={<Wrapper />} />
    </Routes>
  </BrowserRouter>
);
