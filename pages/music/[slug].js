import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import parse from "html-react-parser";
import { purifyHTML } from "@/utils/purifyHTML";
import { options } from "@/utils/htmlParserOptions";

//  *components
import LayoutWithNavigation from "layout/LayoutWithNavigation";
import PostMeta from "@/components/PostMeta";
import SharePost from "@/components/SharePost";
import Services from "@/components/Services";
import Seo from "@/components/SEO";
import Comments from "@/components/Comments";
const AudioPlayerPlaylist = dynamic(
  () => import("@/components/audioplayer/AudioPlayerPlaylist"),
  { ssr: false }
);

//  * utils
import { makeDateReadable } from "@/utils/makeDateReadable";

//* queries
import { getPost } from "@/queries/wordpress";

//  * hooks
import useURL from "hooks/useURL";

//  * custom styles
import S from "@/styles/ArticlePage.module.scss";

const PostPage = ({ data }) => {
  const [playlist, setPlaylist] = useState([]);

  const url = useURL();

  useEffect(() => {
    if (document.getElementById("playlist")) {
      let data = JSON.parse(document.getElementById("playlist")?.textContent);
      setPlaylist(data.tracks);
    }
  }, []);

  // useEffect(() => {
  //   if (playlist) {
  //     console.log(playlist);
  //   }
  // }, [playlist]);

  return (
    <>
      <Seo url={url} seo={data?.seo} />
      <div className={S.container}>
        <main>
          <article>
            <h1 className={S.title}>
              <strong>{data.title}</strong>
            </h1>
            <div className={S.image_container}>
              <Image
                src={data?.featuredImage?.node?.mediaItemUrl}
                width={data?.featuredImage?.node?.mediaDetails?.width}
                height={data?.featuredImage?.node?.mediaDetails?.height}
                layout="responsive"
                sizes={data?.featuredImage?.node?.mediaDetails?.sizes}
                alt={
                  data?.featuredImage?.node?.mediaDetails?.alt
                    ? data?.featuredImage?.node?.mediaDetails?.alt
                    : "image for post"
                }
              />
            </div>
            <PostMeta
              artist={data?.artistName?.artist}
              runtime={data?.runTime?.runtime}
              dateReleased={data?.releaseDate?.releasedate}
              categories={data?.categories?.nodes}
              tags={data?.tags?.nodes}
            />
            <div className={S.content_wrapper}>
              {parse(purifyHTML(data?.content), options(setPlaylist))}
            </div>
            {playlist.length > 0 &&
              (data?.postType?.type == "EP" ||
                data?.postType?.type == "Album") && (
                <AudioPlayerPlaylist trackList={playlist} />
              )}
          </article>
          <SharePost title={data?.title} url={url} />
          <div className={S.services_wrapper}>
            <Services />
          </div>
          <section className={S.comments_wrapper}>
            <Comments
              data={data?.comments?.nodes}
              numberOfComments={data?.commentCount}
              postId={data?.musicId}
            />
          </section>
        </main>
      </div>
    </>
  );
};

export default PostPage;

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const data = await getPost("music", slug);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
