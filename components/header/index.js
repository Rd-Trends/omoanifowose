import React from "react";

import SocialHandles from "@/components/socials";
import S from "@/styles/Header.module.scss";

const Header = () => {
  return (
    <header className={S.header}>
      <h1>
        Hub for entertainment news, download and stream your favorite music
      </h1>
      <h2>
        Stay up to date on all entertainment news, celebrities gist - local and
        international, and lots of motivational quotes.
      </h2>
      <SocialHandles iconSize={50} />
    </header>
  );
};

export default Header;
