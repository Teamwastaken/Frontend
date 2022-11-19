import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background: #0d0d0d;
  display: grid;
  align-items: center;
  left: 0;
  top: -100%;
  transition: 0.4s ease-in-out;
  @media screen and (max-width: 800px) {
    opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
    top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  }
`;
export const CloseIcon = styled(FaTimes)`
  color: #fff;
  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-outerHeight;
  }
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: #fff;
`;

export const SidebarMenu = styled.ul`
display: grid;
grid-template-columns: 1fr;
grid-template-rows: repeat(4, 80px);
text-align-center;

@media screen and (max-width:480px){
  grid-template-rows: repeat(4,60px);
}
`;

export const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    color: #01bf71;
    transition: 0.2s ease-in-outerHeight;
  }
`;
