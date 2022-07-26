import React from "react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
} from "next-share";

import S from "@/styles/ArticlePage.module.scss";

const SharePost = ({ url, title }) => {
  return (
    <div className={S.share_post_container}>
      <h3>Share Post</h3>
      <div className={S.icons_wrapper}>
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon round size={48} />
        </FacebookShareButton>
        <FacebookMessengerShareButton url={url} title={title}>
          <FacebookMessengerIcon round size={48} />
        </FacebookMessengerShareButton>
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon round size={48} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon round size={48} />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default SharePost;
