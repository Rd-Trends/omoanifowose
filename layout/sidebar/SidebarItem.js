import React, { useState, useRef } from "react";
import Link from "next/link";
import { BiChevronDown, BiDisc } from "react-icons/bi";
import classNames from "classnames";

const SidebarItems = ({ navItemData }) => {
  const [collapse, setCollapse] = useState(false);

  const dropDownRef = useRef(null);

  return navItemData.subMenu ? (
    <div>
      <div className="d-flex align-items-center justify-content-between dropdown-wrapper">
        <Link href={navItemData.navLink}>
          <a className="d-flex align-items-center justify-content-between">
            <span>{navItemData.icon}</span>
            <p className="ms-3">{navItemData.title}</p>
          </a>
        </Link>
        <button
          onClick={() => setCollapse(!collapse)}
          type="button"
          className={classNames("dropdown-btn", {
            "dropdown-btn-show-dropdown-items": collapse,
          })}
        >
          <BiChevronDown size={25} />
        </button>
      </div>

      <ul
        className={classNames(
          "d-flex flex-column align-items-start justify-content-between dropdown-items",
          { show_sidebar_items: collapse }
        )}
        ref={dropDownRef}
      >
        {navItemData.subMenu.map((navItem, index) => (
          <li key={index} className="d-flex align-items-center">
            <Link href={`/posts/category/${navItem.slug}`}>
              <a className="d-flex align-items-center justify-content-between">
                <span>
                  <BiDisc />
                </span>
                <p className="ms-3">{navItem.name}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Link href={navItemData.navLink}>
      <a className="d-flex align-items-center justify-content-between">
        <span>{navItemData.icon}</span>
        <p className="ms-3">{navItemData.title}</p>
      </a>
    </Link>
  );
};

export default SidebarItems;
