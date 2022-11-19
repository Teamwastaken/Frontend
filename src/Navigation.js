import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Navbar/sidebar";
import React, { useState } from "react";
const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log("test");
  };
  return (
    <div>
      <header>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
      </header>
    </div>
  );
};

export default Navigation;
