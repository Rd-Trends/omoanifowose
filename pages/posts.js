import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

//  * components
import Pagination from "@/components/Pagination";
import ArticleCard from "@/components/card/ArticleCard";
import LayoutWithNavigation from "layout/LayoutWithNavigation";
import Input from "@/components/FormFields/Input";
import Services from "@/components/Services";
import Seo from "@/components/SEO";

//  * icons
import { AiOutlineSearch } from "react-icons/ai";

// * query
import { getNews } from "@/queries/news";

//  * hooks
import useURL from "hooks/useURL";

import S from "@/styles/NewsPage.module.scss";

const setOffSet = (page, pageLimit) => {
  return Math.ceil((page - 1) * pageLimit);
};

const News = ({ page: initPage, search: initSearch, data }) => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState(initSearch);
  const [page, setPage] = useState(initPage);

  const router = useRouter();

  const url = useURL();

  useEffect(() => {
    setPosts(data.edges);
    setTotalPosts(data.pageInfo.offsetPagination.total);
  }, [data?.edges, data?.pageInfo?.offsetPagination?.total]);

  useEffect(() => {
    if (search) {
      router.push(`/posts?search=${search}&page=${page}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/posts?page=${page}`, undefined, {
        shallow: true,
      });
    }
  }, [page, search]);

  useEffect(() => {
    window.scrollTo(0, 0);
    updatePost();
  }, [router?.query?.page, search]);

  const updatePageData = (data) => {
    const updatedPosts = data.edges;
    setPosts((prevPagePosts) => [...updatedPosts]);
    setTotalPosts(data.pageInfo.offsetPagination.total);
  };

  const updatePost = async () => {
    let data = await getNews(12, setOffSet(page, 12), search);

    updatePageData(data);
  };

  const setSearchValue = async (e) => {
    e.preventDefault();
    setSearch(inputValue);
    setPage(1);
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Seo url={url} />
      <div className={S.container}>
        <main>
          <div className={S.titleAndSearchSection}>
            <h1>News</h1>
            <form onSubmit={setSearchValue}>
              <Input
                type="search"
                required
                placeholder="Search....."
                onChange={handleInputValueChange}
              />
              <button label="search">{<AiOutlineSearch />}</button>
            </form>
          </div>

          <div className={S.posts_container}>
            {posts.map((post) => {
              const { node } = post;
              let { excerpt, date, slug, title, featuredImage, seo } = node;
              return (
                <ArticleCard
                  key={slug}
                  title={title}
                  slug={slug}
                  excerpt={excerpt}
                  featuredImage={featuredImage?.node?.mediaItemUrl}
                  altText={featuredImage?.node?.title}
                  date={date}
                  readTime={seo.readingTime}
                />
              );
            })}
          </div>

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
  const page = query.page ? query.page : 1;
  const search = query.search ? query.search : "";
  const data = await getNews(12, setOffSet(page, 12), search);

  return {
    props: { page, search, data }, // will be passed to the page component as props
  };
}

export default News;
