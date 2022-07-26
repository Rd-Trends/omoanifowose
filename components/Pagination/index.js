import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import S from "@/styles/Pagination.module.scss";

const Pagination = ({ totalPosts, pageLimit, setPage, page }) => {
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    setPageCount(Math.ceil(totalPosts / pageLimit));
  }, [totalPosts, pageLimit]);

  const handlePageClick = (data) => {
    setPage(data.selected + 1);
  };

  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <ReactPaginate
        breakLabel="..."
        nextLabel={<MdNavigateNext size={30} />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={3}
        pageCount={pageCount}
        previousLabel={<MdNavigateBefore size={30} />}
        forcePage={page ? page - 1 : 0}
        disableInitialCallback={false}
        renderOnZeroPageCount={null}
        containerClassName={S.wrapper}
        activeClassName={S.activePage}
        previousLinkClassName={S.previousPage}
      />
    </div>
  );
};

export default Pagination;
