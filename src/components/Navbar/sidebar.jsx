import React from "react";
import {
  Icon,
  SidebarContainer,
  SidebarLink,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
} from "./sidebarStyles";
const Sidebar = ({ isOpen, toggle, user }) => {
  function LogOut() {
    localStorage.setItem("logedIn", false);
    localStorage.removeItem("token");
    window.location = "/login";
  }

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        {user && (
          <SidebarMenu>
            <SidebarLink to='/myprofile'>{user.name}</SidebarLink>
            <SidebarLink to='/'>
              {" "}
              <div className='navlink' onClick={() => LogOut()}>
                Logout
              </div>
            </SidebarLink>
          </SidebarMenu>
        )}
        {!user && (
          <SidebarMenu>
            <SidebarLink to='/register'>Register</SidebarLink>
            <SidebarLink to='/login'>Login</SidebarLink>
          </SidebarMenu>
        )}
      </SidebarWrapper>
    </SidebarContainer>
  );
};
export default Sidebar;
