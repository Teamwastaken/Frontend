import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

import {
  Nav,
  NavLogo,
  NavbarContainer,
  MobileIcon,
  NavItem,
  NavLinks,
  NavMenu,
} from "./navbarStyles";
const Navbar = ({ toggle }) => {
  const [rerender, setRerender] = useState(false);

  function LogOut() {
    localStorage.setItem("logedIn", false);
    setRerender(!rerender);
  }

  if (localStorage.getItem("logedIn") === "true")
    return (
      <Nav>
        <NavbarContainer>
          <NavLogo to='../'>Test</NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to='/myProfile'>My Profile</NavLinks>
            </NavItem>
            <NavItem>
              <div className='navlink' onClick={() => LogOut()}>
                Logout
              </div>
            </NavItem>
          </NavMenu>
        </NavbarContainer>
      </Nav>
    );

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='../'>Hi</NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        <NavMenu>
          <NavItem>
            <NavLinks to='/login'>Login</NavLinks>
          </NavItem>
          <NavItem>
            <NavLinks to='/register'>Register</NavLinks>
          </NavItem>
        </NavMenu>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
