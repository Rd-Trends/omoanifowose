import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

//  ** components
import LayoutWithNavigation from "layout/LayoutWithNavigation";
import Pagination from "@/components/Pagination";
import Services from "@/components/Services";
import Seo from "@/components/SEO";

//  * query
import { getQuotes } from "@/queries/quotes";

//  * hooks
import useURL from "hooks/useURL";

//  ** custom style
import S from "@/styles/Quotespage.module.scss";

const setOffSet = (page, pageLimit) => {
  return Math.ceil((page - 1) * pageLimit);
};

const Quotes = ({ page: initPage, data }) => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initPage);

  const router = useRouter();

  const url = useURL();

  useEffect(() => {
    setPosts(data.edges);
    setTotalPosts(data.pageInfo.offsetPagination.total);
  }, [data?.edges, data?.pageInfo?.offsetPagination?.total]);

  useEffect(() => {
    router.push(`/quotes?page=${page}`, undefined, {
      shallow: true,
    });
  }, [page]);

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePost();
  }, [router?.query?.page]);

  const updatePageData = (data) => {
    const updatedPosts = data.edges;
    setPosts((prevPagePosts) => [...updatedPosts]);
    setTotalPosts(data.pageInfo.offsetPagination.total);
  };

  const updatePost = async () => {
    let data = await getQuotes(12, setOffSet(page, 12));

    updatePageData(data);
  };

  return (
    <>
      <Seo url={url} />
      <div className={S.container}>
        <main>
          <div className={S.titleAndSearchSection}>
            <h1>Quotes</h1>
          </div>

          <section className={S.image_wrapper}>
            {posts.map((post, index) => {
              const { node } = post;
              let { title, mediaItemUrl } = node.image.quoteImage;
              return (
                <Image
                  key={title + index}
                  alt={title}
                  src={mediaItemUrl}
                  width={100}
                  height={100}
                  layout="responsive"
                  sizes="100vw"
                />
              );
            })}
          </section>

          <Pagination
            totalPosts={totalPosts}
            pageLimit={12}
            page={page}
            setPage={setPage}
          />
        </main>
        <aside className={S.aside}>
          <Services />
        </aside>
      </div>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { page } = query;
  let offset = page ? Math.ceil((page - 1) * 12) : null;
  const data = await getQuotes(12, offset);

  return {
    props: { page: page ? page : 1, data }, // will be passed to the page component as props
  };
}

export default Quotes;
