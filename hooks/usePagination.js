import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const usePagination = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState(initSearch);
  const [page, setPage] = useState(initPage);

  const router = useRouter();

  useEffect(() => {
    setPosts(data.edges);
    setTotalPosts(data.pageInfo.offsetPagination.total);
  }, [data?.edges, data?.pageInfo?.offsetPagination?.total]);

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

  return {
    page,
    setPage,
    search,
    setSearch,
    posts,
    setPosts,
    totalPosts,
    setSearchValue,
    setInputValue
  };
};

export default usePagination;
