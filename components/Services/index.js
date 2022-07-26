import React from "react";
import SocialHandles from "../socials";

import S from "@/styles/Services.module.scss";

const Services = () => {
  return (
    <div className={S.services_container}>
      <h2>How can we help you?</h2>
      <p>
        If you want to distribute your music to different platforms such as
        spotify, audioMack etc, or promote your events or you want to make
        custom advertisements, please reach out to us on any of social media
        handles.
      </p>
      <h3>We run the following type of adverts</h3>
      <ul>
        <li>Sponsored posts</li>
        <li>Banner Ads</li>
        <li>Text Link Ads</li>
      </ul>
      <p>Our rates are very affordable! Contact us NOW!</p>
      <SocialHandles color="grey" />
    </div>
  );
};

export default Services;
