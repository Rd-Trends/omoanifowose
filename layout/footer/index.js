import React from "react";
import Link from "next/link";
import Logo from "layout/Logo";
import SocialHandles from "@/components/socials";
import navigation from "../navigation";

const Footer = () => {
  return (
    <div className="footer">
      <div className="main_section">
        <div>
          <Logo imgSrc={"/logo/omo white.png"} />
          <SocialHandles />
        </div>
        <div>
          <h3>Navigation</h3>
          <ul>
            {navigation.map((navitem) => (
              <li key={navitem.id}>
                <Link href={navitem.navLink}>
                  <a>{navitem.title}</a>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </li>
            <li>
              <Link href="/DMCA-policy">
                <a>DMCA Notice</a>
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            <li>Music promotion</li>
            <li>Events promotion</li>
            <li>Artist Hyping</li>
            <li>Advertisements</li>
          </ul>
        </div>
      </div>
      <div className="copy_right_section">
        <p>&copy; omoanifowose.com {`${new Date().getFullYear()}`}</p>
      </div>
    </div>
  );
};

export default Footer;
