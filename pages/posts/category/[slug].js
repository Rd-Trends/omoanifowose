import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//  * components
import Pagination from "@/components/Pagination";
import MusicCard from "@/components/card/MusicCard";
import LayoutWithNavigation from "layout/LayoutWithNavigation";
import Services from "@/components/Services";
import Seo from "@/components/SEO";

//  * query
import { getTaxonomy } from "@/queries/taxonomy";

//  * hooks
import useURL from "hooks/useURL";

//  *custom styles
import S from "@/styles/taxonomy.module.scss";

import { compare } from "@/utils/compare";

const setOffSet = (page, pageLimit) => {
  return Math.ceil((page - 1) * pageLimit);
};

const Category = ({ category, categoryTitle, meta }) => {
  const url = useURL();

  return (
    <>
      <Seo url={url} seo={meta} />
      <div className={S.container}>
        <main>
          <div className={S.titleAndSearchSection}>
            <h1>Category: {categoryTitle}</h1>
          </div>

          <div className={S.posts_container}>
            {category.sort(compare).map((item) => {
              let { slug, title, featuredImage, postType, page } = item;
              return (
                <MusicCard
                  key={slug}
                  title={title}
                  slug={slug}
                  page={page}
                  featuredImage={featuredImage?.node?.mediaItemUrl}
                  buttonText={page === "posts" ? "Read More..." : "Download"}
                  altText={featuredImage?.node?.title}
                  postType={postType.type}
                />
              );
            })}
          </div>

          {/* <Pagination
            totalPosts={totalPosts}
            pageLimit={12}
            page={page}
            setPage={setPage}
          /> */}
        </main>
        <aside className={S.aside}>
          <Services />
        </aside>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  const data = await getTaxonomy("category", slug);
  const music =
    data && data.music
      ? data.music.nodes.map((node) => ({ ...node, page: "music" }))
      : [];
  const posts =
    data && data.posts
      ? data.posts.nodes.map((node) => ({ ...node, page: "posts" }))
      : [];
  const category = [...posts, ...music];

  if (!category) {
    return {
      notFound: true,
    };
  }

  return {
    props: { category, categoryTitle: slug, meta: data?.seo }, // will be passed to the page component as props
  };
}

export default Category;
