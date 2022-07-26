import { NextSeo } from "next-seo";
import PropTypes from "prop-types";

/**
 * Custom SEO component
 *
 * Used to seo meta tags for each page
 *
 * @param {Object} seo Seo.
 * @param {string} uri Page URI.
 * @see https://www.npmjs.com/package/next-seo
 *
 * @returns {JSX.Element}
 *
 */
const Seo = ({ seo, url }) => {
  const {
    title,
    metaDesc,
    focuskw,
    metaKeywords,
    opengraphDescription,
    opengraphType,
    opengraphTitle,
    opengraphImage,
    opengraphAuthor,
    opengraphModifiedTime,
    opengraphPublishedTime,
    opengraphPublisher,
    opengraphSiteName,
  } = seo;

  return (
    <NextSeo
      title={title}
      description={opengraphDescription || metaDesc}
      canonical={url}
      noindex={false}
      nofollow={false}
      openGraph={{
        type: opengraphType,
        locale: "en_NG",
        url: url,
        title: opengraphTitle ? opengraphTitle : title,
        description: opengraphDescription ? opengraphDescription : metaDesc,
        images: [
          {
            url: opengraphImage?.mediaItemUrl,
            width: 1280,
            height: 720,
          },
        ],
        article: {
          publishedTime: opengraphPublishedTime ? opengraphPublishedTime : "",
          modifiedTime: opengraphModifiedTime ? opengraphModifiedTime : "",
          authors: opengraphAuthor ? [opengraphAuthor] : [],
        },
        /* eslint-disable */
        site_name: opengraphSiteName,
        /* eslint-enable */
      }}
      twitter={{
        handle: "@omo__anifowose",
        site: "@omo__anifowose",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        { name: "keywords", content: metaKeywords ? metaKeywords : focuskw },
      ]}
    />
  );
};

Seo.propTypes = {
  seo: PropTypes.object,
};

Seo.defaultProps = {
  seo: {
    canonical: "",
    title: "Anifowose - EnterTainment Site, Music Download, Quotes",
    metaKeywords: "Download, MUsic, Entertainment, Motivation, Quotes",
    metaDesc: `Download and stream your favorite music, get motivational quotes,
get all entertainment news, trending celebrities update - local and international`,
    opengraphDescription: `Download and stream your favorite music, get motivational quotes,
get all entertainment news, trending celebrities update - local and international`,
    opengraphTitle:
      "Omoanifowose - EnterTainment Hub, Download and Stream Music",
    opengraphImage: {
      mediaItemUrl: "/opengraph.png",
    },
    opengraphUrl: "https://omoanifowose.com",
    opengraphSiteName: "Anifowose",
    opengraphType: "website",
  },
};

export default Seo;
