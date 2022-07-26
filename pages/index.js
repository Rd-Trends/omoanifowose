import { useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

//  ** components
import LayoutWithNavigation from "../layout/LayoutWithNavigation";
import Header from "@/components/header";
import ArticleCard from "@/components/card/ArticleCard";
import MusicCard from "@/components/card/MusicCard";
import Services from "@/components/Services";
import Seo from "@/components/SEO";

// ** Icons
import { BiChevronRight } from "react-icons/bi";

//  ** hooks
import useURL from "hooks/useURL";

//  ** styles
import S from "../styles/Home.module.scss";

// * wp queries
import { getPosts } from "@/queries/wordpress";

export default function Home({ posts }) {
  const url = useURL();
  return (
    <>
      <Seo url={url} />
      <Header />
      <div className={S.container}>
        <main className={S.main}>
          <section className={S.section_wrapper}>
            <h2 className={S.section_title}>Recent Music</h2>
            <div className={S.recent_music_container}>
              {posts.recentMusic.map((data) => (
                <MusicCard
                  key={data?.slug}
                  title={data?.title}
                  slug={data?.slug}
                  page="music"
                  featuredImage={data?.featuredImage?.node?.mediaItemUrl}
                  altText={data?.featuredImage?.node?.title}
                  buttonText="Download"
                  postType={data?.postType?.type}
                />
              ))}
            </div>
            <Link href="/music">
              <a className={S.see_more_link}>
                <span>More Music</span> <BiChevronRight size={25} />
              </a>
            </Link>
          </section>
          <section className={S.section_wrapper}>
            <h2 className={S.section_title}>Recent News</h2>
            <div className={S.recent_news_container}>
              {posts.recentNews.map((post) => (
                <ArticleCard
                  key={post?.slug}
                  title={post?.title}
                  slug={post?.slug}
                  excerpt={post?.excerpt}
                  featuredImage={post?.featuredImage?.node?.mediaItemUrl}
                  altText={post?.featuredImage?.node?.title}
                  readTime={post?.seo?.readingTime}
                  date={post?.date}
                />
              ))}
            </div>
            <Link href="/posts">
              <a className={S.see_more_link}>
                <span>More News</span> <BiChevronRight size={25} />
              </a>
            </Link>
          </section>

          <section className={S.section_wrapper}>
            <h2 className={S.section_title}>Be Motivated!</h2>
            <div className={S.recent_quotes_container}>
              {posts?.recentQuotes.map((quote, index) => {
                return (
                  <Image
                    key={index}
                    src={quote?.image.quoteImage?.mediaItemUrl}
                    alt={quote?.image.quoteImage?.title}
                    height={170}
                    width={100}
                  />
                );
              })}
            </div>
            <Link href="/quotes">
              <a className={S.see_more_link}>
                <span>More Photos</span> <BiChevronRight size={25} />
              </a>
            </Link>
          </section>
        </main>
        <aside className={S.aside}>
          <Services />
        </aside>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
  };
}
