import React from "react";
import Image from "next/image";
import Link from "next/link";
import Styles from "@/styles/card.module.scss";

// * utils
import { shortenSentence } from "@/utils/shortenSentence";
import { makeDateReadable } from "@/utils/makeDateReadable";
import parse from "html-react-parser";
import { purifyHTML } from "@/utils/purifyHTML";

// * iocns
import { BiCalendar, BiTime } from "react-icons/bi";

const ArticleCard = ({
  title,
  excerpt,
  featuredImage,
  date,
  altText,
  slug,
  readTime,
}) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name == "p") {
        const p = domNode.children[0].data;
        return (
          <p className={Styles.excerpt}>
            {shortenSentence(p, 100)} <a href={`/posts/${slug}`}>Read more</a>
          </p>
        );
      }
    },
  };

  return (
    <Link href={`/posts/${slug}`} passHref>
      <article className={Styles.card_horizontal}>
        <div className={Styles.image_wrapper}>
          {featuredImage && (
            <Image src={featuredImage} layout="fill" alt={altText} />
          )}
        </div>
        <div>
          <h2 className={Styles.title}>{title}</h2>
          {excerpt && <>{parse(purifyHTML(excerpt), options)}</>}
          <div className="d-flex align-items-center">
            {date && (
              <div className="d-flex align-items-center">
                <BiCalendar color="var(--primary_color)" />
                <small>{makeDateReadable(date)}</small>
              </div>
            )}
            {readTime && (
              <div className="d-flex align-items-center">
                <BiTime color="var(--primary_color)" />
                <small>{readTime} min read</small>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
