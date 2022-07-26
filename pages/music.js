import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//  * components
import Pagination from "@/components/Pagination";
import MusicCard from "@/components/card/MusicCard";
import LayoutWithNavigation from "layout/LayoutWithNavigation";
import Input from "@/components/FormFields/Input";
import Services from "@/components/Services";
import Seo from "@/components/SEO";

//  * icons
import { AiOutlineSearch } from "react-icons/ai";

//  * query
import { getAllMusic, getMusicGenres } from "@/queries/music";

//  * hooks
import useURL from "hooks/useURL";

//  *custom styles
import S from "@/styles/musicpage.module.scss";
  
import { filterCategories } from "@/utils/filterCategories";

const setOffSet = (page, pageLimit) => {
  return Math.ceil((page - 1) * pageLimit);
};

const Music = ({ page: initPage, search: initSearch, data, categories }) => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState(initSearch);
  const [page, setPage] = useState(initPage);
  const [genres, setGenres] = useState([]);

  const router = useRouter();

  const url = useURL();

  useEffect(() => {
    setPosts(data.edges);
    setTotalPosts(data.pageInfo.offsetPagination.total);
  }, [data?.edges, data?.pageInfo?.offsetPagination?.total]);

  useEffect(() => {
    setGenres(() => filterCategories(categories));
  }, [categories]);

  useEffect(() => {
    if (search) {
      router.push(`/music?search=${search}&page=${page}`, undefined, {
        shallow: true,
      });
    } else {
      router.push(`/music?page=${page}`, undefined, {
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
    let data = await getAllMusic(12, setOffSet(page, 12), search);

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

  const Genres = () => {
    return (
      <div className={S.genreSection}>
        {genres.map((genre) => {
          return (
            <a href={`/posts/category/${genre.slug}`} key={genre.name}>
              {genre.name}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <Seo
        url={url}
        seo={{
          title: "Music - Anifowose",
          metaDesc:
            "Download and stream your favourite music: singles, EP, albums, latest and ThrowBacks.",
        }}
      />
      <div className={S.container}>
        <main>
          <Genres />
          <div className={S.titleAndSearchSection}>
            <h1>Music</h1>
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
              let { slug, title, featuredImage, postType } = node;
              return (
                <MusicCard
                  key={slug}
                  title={title}
                  slug={slug}
                  page="music"
                  featuredImage={featuredImage?.node?.mediaItemUrl}
                  buttonText="Download"
                  altText={featuredImage?.node?.title}
                  postType={postType.type}
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
  const { page } = query;
  let offset = page ? Math.ceil((page - 1) * 12) : null;
  const data = await getAllMusic(12, offset, null);
  const categories = await getMusicGenres();

  return {
    props: { page: page ? page : 1, data, categories }, // will be passed to the page component as props
  };
}

export default Music;
