import React, { useState } from "react";
import { useCommunityFetch } from "../../hooks/useCommunityFetch2";
import Pagination from "../Pagination";
import FreeBoardLists from "./FreeBoardLists";
import pencil from "../../images/pencil.svg";
import { Link } from "react-router-dom";

import Loading from "../Loading";

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
          <Link to="/community/post/create">
            <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
              <img className="w-5 h-5" src={pencil} alt="write-post-button" />
            </div>
          </Link>
        </Pagination>
      )}
    </>
  );
};

export default FreeBoard;
