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
const Navbar = ({ toggle, user }) => {
  console.log(user);
  function LogOut() {
    localStorage.setItem("logedIn", false);
    localStorage.removeItem("token");
    window.location = "/login";
  }

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='../'>Hi</NavLogo>
        <MobileIcon onClick={toggle}>
          <FaBars />
        </MobileIcon>
        {!user && (
          <NavMenu>
            <NavItem>
              <NavLinks to='/login'>Login</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to='/register'>Register</NavLinks>
            </NavItem>
          </NavMenu>
        )}
        {user && (
          <NavMenu>
            <NavItem>
              <NavLinks to='/myProfile'>{user.name}</NavLinks>
            </NavItem>
            <NavItem>
              <div className='navlink' onClick={() => LogOut()}>
                Logout
              </div>
            </NavItem>
          </NavMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
