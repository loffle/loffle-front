import React, { useState } from "react";
import { useCommunityFetch } from "../../hooks/useCommunityFetch2";
import Pagination from "../Pagination";
import FreeBoardLists from "./FreeBoardLists";

import Loading from "../Loading";
import CreateButton from "../CreateButton";

const FreeBoard = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");

  const { posts, loading, postsPerPage, totalPosts } = useCommunityFetch(
    "post",
    pageNumber,
    order,
    searchTerm
  );

  return (
    <>
      {loading && <Loading />}
      <FreeBoardLists
        posts={posts}
        loading={loading}
        setOrder={setOrder}
        setSearchTerm={setSearchTerm}
      ></FreeBoardLists>
      {loading || (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={totalPosts}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        >
          {/* 게시물 작성 버튼 */}
          <CreateButton to={"/community/post/create"} />
        </Pagination>
      )}
    </>
  );
};

export default FreeBoard;
