import Image from "next/image";
import Script from "next/script";
import dynamic from "next/dynamic";

const SimplePlayer = dynamic(
  () => import("@/components/audioplayer/SimplePlayer"),
  { ssr: false }
);

let arr = [];
export const options = (setPlaylist) => {
  return {
    replace: (domNode) => {
      if (domNode.name == "img") {
        const src = domNode.attribs.src;
        const height = domNode.attribs.height;
        const sizes = domNode.attribs.sizes;
        const width = domNode.attribs.width;
        const alt = domNode.attribs?.alt;

        return (
          <Image
            src={src}
            width={width}
            height={height}
            layout="responsive"
            sizes={sizes}
            alt={alt ? alt : "image for post"}
          />
        );
      }

      if (domNode.name === "audio") {
        const src = domNode.attribs.src;
        // console.log(domNode)
        // const downloadName = getMusicNameFromURL(src);
        // arr.push(src);
        // console.log(arr);

        if (src) {
          return <SimplePlayer audioSrc={src} btnSize={32} />;
        } else {
          return <></>;
        }
      }

      if (domNode.name == "script") {
        const src = domNode.attribs.src;
        if (domNode.children[0]?.data) {
          return (
            <Script type="application/json" id="playlist">
              {domNode.children[0].data}
            </Script>
          );
        } else {
          return <Script strategy="lazyOnload" src={src}></Script>;
        }
        // if (domNode.attribs.src == "//www.instagram.com/embed.js") {
        //   const src = domNode.attribs.src;
        //   return <Script async src={src}></Script>;
        // } else {
        //   return null;
        // }
      }
    },
  };
};
