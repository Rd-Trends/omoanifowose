import React from "react";
import Button from "@/components/Button";
import { FaBars } from "react-icons/fa";
import NavItem from "./NavItem";
import Logo from "../Logo";

const NavigationBar = ({ setShowSidebar, navData }) => {
  return (
    <nav className="d-flex align-items-center justify-content-between nav-items main-nav">
      <Logo imgSrc="/logo/omo colour.png" />
      <Button
        color="default"
        className="navbar-toggler"
        onClick={() => setShowSidebar(true)}
      >
        <FaBars size={30} />
      </Button>
      <ul className="d-flex align-items-center justify-content-between nav-items">
        {navData.map((navItem, index) => (
          <li key={navItem.id}>
            <NavItem navItemData={navItem} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
