import React from "react";
import Link from "next/link";
import DropDown from "./DropDown";

const NavItem = ({ navItemData }) => {
  return navItemData.subMenu ? (
    <DropDown navItemData={navItemData} />
  ) : (
    <Link href={navItemData.navLink}>
      <a>{navItemData.title}</a>
    </Link>
  );
};

export default NavItem;
