import { FaBars } from "react-icons/fa";
import auth from "../../services/authService";
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
  function LogOut() {
    auth.logout();
    window.location = "/login";
  }

  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to='../'>Event Einlass System</NavLogo>
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
