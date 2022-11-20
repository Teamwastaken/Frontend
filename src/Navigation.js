import Navbar from "./components/Navbar/navbar";
import Sidebar from "./components/Navbar/sidebar";
import React, { useState } from "react";
const Navigation = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
    console.log("test");
  };
  return (
    <div>
      <header>
        <Sidebar isOpen={isOpen} toggle={toggle} user={user} />
        <Navbar toggle={toggle} user={user} />
      </header>
    </div>
  );
};

export default Navigation;
