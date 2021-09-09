import React from "react";
import { usePostFetch } from "../../hooks/usePostFetch";
import Pagination from "../Pagination";
import FreeBoardLists from "./FreeBoardLists";
import pencil from "../../images/pencil.svg";
import { Link } from "react-router-dom";

const FreeBoard = (props) => {
  const {
    posts,
    loading,
    postsPerPage,
    currentPage,
    setCurrentPage,
  } = usePostFetch();

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  return (
    <>
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
