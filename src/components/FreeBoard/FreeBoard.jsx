import React from "react";
import { usePostFetch } from "../../hooks/usePostFetch";
import Header from "../Header";
import Pagination from "../Pagination";
import FreeBoardLists from "./FreeBoardLists";

const FreeBoard = (props) => {
  const {
    posts,
    loading,
    postsPerPage,
    currentPage,
    setCurrentPage,
  } = usePostFetch();

  const indexOfLast = currentPage * postsPerPage; //10 = 1*10
  const indexOfFirst = indexOfLast - postsPerPage; //0 = 10-10
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <>
      <Header />
      <FreeBoardLists
        posts={currentPosts(posts)}
        loading={loading}
      ></FreeBoardLists>
      {loading || (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          currentPage={currentPage}
          paginate={setCurrentPage}
        ></Pagination>
      )}
    </>
  );
};

export default FreeBoard;
