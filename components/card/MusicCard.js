import React from "react";
import Image from "next/image";
import Link from "next/link";

//  ** util
import { shortenSentence } from "@/utils/shortenSentence";

//  ** custom styles
import Styles from "@/styles/card.module.scss";

const MusicCard = ({
  title,
  featuredImage,
  slug,
  page,
  buttonText,
  altText,
  postType,
}) => {
  return (
    <Link href={`/${page}/${slug}`} passHref>
      <article className={Styles.vertical_card}>
        <div className={Styles.image_wrapper}>
          {featuredImage && (
            <Image
              src={featuredImage}
              width={50}
              height={50}
              layout="responsive"
              sizes="100vw"
              priority
              alt={altText}
            />
          )}
        </div>

        {postType && <p className={Styles.post_type}>{postType}</p>}

        <div className={Styles.Card_content}>
          <h2 className={Styles.card_title}>{title}</h2>
        </div>

        <a href={`/${page}/${slug}`} className={Styles.download_link_btn}>
          {buttonText}
        </a>
      </article>
    </Link>
  );
};

export default MusicCard;
