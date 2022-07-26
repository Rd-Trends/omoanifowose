import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Footer from "./footer";
import Meta from "./Meta";
import { filterCategories } from "@/utils/filterCategories";
import { getMusicGenres } from "@/queries/music";
import navigation from "./navigation";

import { BiMusic, BiNews, BiHome } from "react-icons/bi";
import { BsChatLeftQuote, BsQuestionCircle } from "react-icons/bs";

const LayoutWithNavigation = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [navData, setNavData] = useState(navigation);

  useEffect(() => {
    getNavData();
  }, []);

  const getNavData = async () => {
    const categories = await getMusicGenres();
    const genres = filterCategories(categories);
    const navItems = [
      {
        id: 1,
        title: "Home",
        navLink: "/",
        icon: <BiHome />,
      },
      {
        id: 2,
        title: "About",
        navLink: "/about",
        icon: <BsQuestionCircle />,
      },
      {
        id: 3,
        title: "Music",
        navLink: "/music",
        icon: <BiMusic />,
        subMenu: genres,
      },

      {
        id: 4,
        title: "Blog",
        navLink: "/posts",
        icon: <BiNews />,
      },
      {
        id: 5,
        title: "Quotes",
        navLink: "/quotes",
        icon: <BsChatLeftQuote />,
      },
    ];
    setNavData([...navItems]);
  };

  return (
    <div className="layout_with_navigation_wrapper">
      <Meta />
      <Navbar setShowSidebar={setShowSidebar} navData={navData} />
      <Sidebar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        navData={navData}
      />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutWithNavigation;
