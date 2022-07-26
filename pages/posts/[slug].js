import { useEffect, useState } from "react";
import Image from "next/image";
import parse from "html-react-parser";
import { purifyHTML } from "@/utils/purifyHTML";
import { options } from "@/utils/htmlParserOptions";

//  * components
import LayoutWithNavigation from "layout/LayoutWithNavigation";
import PostMeta from "@/components/PostMeta";
import SharePost from "@/components/SharePost";
import Services from "@/components/Services";
import Comments from "@/components/Comments";
import Seo from "@/components/SEO";

//* queries
import { getPost } from "@/queries/wordpress";

//  * hooks
import useURL from "hooks/useURL";

//  * utils
import { makeDateReadable } from "@/utils/makeDateReadable";

//  * custom styles
import S from "@/styles/ArticlePage.module.scss";

const PostPage = ({ data }) => {
  const url = useURL();

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
              {data?.featuredImage?.node?.mediaItemUrl && (
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
              )}
            </div>

            <PostMeta
              author={data?.author?.node?.username}
              readTime={data?.seo?.readingTime}
              datePublished={makeDateReadable(data?.date)}
              categories={data?.categories?.nodes}
              tags={data?.tags?.nodes}
            />
            <div className={S.content_wrapper}>
              {parse(purifyHTML(data?.content), options())}
            </div>
          </article>
          <SharePost title={data?.title} url={url} />
          <div className={S.services_wrapper}>
            <Services />
          </div>
          <section className={S.comments_wrapper}>
            <Comments
              data={data?.comments?.nodes}
              numberOfComments={data?.commentCount}
              postId={data?.postId}
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
  // console.log(context);

  const data = await getPost("post", slug);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data }, // will be passed to the page component as props
  };
}
