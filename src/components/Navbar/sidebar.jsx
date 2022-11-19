import React from "react";
import {
  Icon,
  SidebarContainer,
  SidebarLink,
  CloseIcon,
  SidebarWrapper,
  SidebarMenu,
} from "./sidebarStyles";
const Sidebar = ({ isOpen, toggle }) => {
  if (localStorage.getItem("logedIn") === "true")
    return (
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
          <CloseIcon />
        </Icon>
        <SidebarWrapper>
          <SidebarMenu>
            <SidebarLink to='/myprofile'>My Profile</SidebarLink>
            <SidebarLink to='/'>Logout</SidebarLink>
          </SidebarMenu>
        </SidebarWrapper>
      </SidebarContainer>
    );
  <SidebarContainer isOpen={isOpen} onClick={toggle}>
    <Icon onClick={toggle}>
      <CloseIcon />
    </Icon>
    <SidebarWrapper>
      <SidebarMenu>
        <SidebarLink to='/register'>Register</SidebarLink>
        <SidebarLink to='/login'>Login</SidebarLink>
      </SidebarMenu>
    </SidebarWrapper>
  </SidebarContainer>;
};
export default Sidebar;
