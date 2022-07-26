import React from "react";
import SidebarItem from "./SidebarItem";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";

const Sidebar = ({ showSidebar, setShowSidebar, navData }) => {
  return (
    <div>
      <div
        className={classNames("sidebar-overlay", {
          "show-sidebar-overlay": showSidebar,
        })}
      ></div>
      {/* {showSidebar && ( */}
      <nav
        className={classNames(
          "d-flex flex-column align-items-start main-sidebar",
          { "show-sidebar": showSidebar }
        )}
      >
        <button
          aria-label="Navigation Toggler"
          onClick={() => setShowSidebar(false)}
        >
          <FaTimes />
        </button>
        <ul className="d-flex flex-column align-items-start justify-content-between sidebar-items mt-3">
          {navData.map((navItem, index) => (
            <li key={navItem.id}>
              <SidebarItem navItemData={navItem} />
            </li>
          ))}
        </ul>
      </nav>
      {/*  )} */}
    </div>
  );
};

export default Sidebar;
