import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

const Try = ({ navItemData }) => {
  return (
    <>
      <Link href={navItemData.navLink}>
        <a>
          {navItemData.title}{" "}
          <span className="dropdown_icon">
            <BiChevronDown />
          </span>
        </a>
      </Link>
      <ul className="dropdown" aria-label="submenu">
        {navItemData.subMenu.map((navItem, index) => (
          <li key={index}>
            <Link href={`/posts/category/${navItem.slug}`}>
              <a>{navItem.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

Try.propTypes = {};

export default Try;
