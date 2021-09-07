import React, { useState } from "react";
import { useReviewFetch } from "../../hooks/useReviewFetch";
import Pagination from "../Pagination";
import pencil from "../../images/pencil.svg";
import { Link } from "react-router-dom";
import ReviewDetail from "./ReviewDetail";
import Search from "../Search";
import Loading from "../Loading";
import search from "../../images/search_btn.svg";

const ReviewBoard = (props) => {
  const {
    reviews,
    loading,
    reviewsPerPage,
    currentPage,
    setCurrentPage,
  } = useReviewFetch();

  //Search Modal
  const [isSearchModalOn, setIsSearchModalOn] = useState(false);

  const handleSearchModal = (e) => {
    setIsSearchModalOn(!isSearchModalOn);
  };

  //Pagination
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  function currentReviews(tmp) {
    let currentReviews = 0;
    //배열에서 하나만 뽑아주기 위해서 pop추가로 작성
    currentReviews = tmp.slice(indexOfFirst, indexOfLast).pop();
    return currentReviews;
  }

  return (
    <>
      {loading && <Loading />}
      {isSearchModalOn && (
        <Search icon={search} handleSearchModal={handleSearchModal} />
      )}
      <div className="max-w-480 min-h-screen">
        <div className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold">당첨 후기 게시판</h1>
          <div className="flex items-center">
            <button onClick={() => handleSearchModal()}>
              <img className="w-4 h-4" src={search} alt="search-button" />
            </button>
            <select className="text-gray h-5 ml-5 bg-white">
              <option>최신순 </option>
              <option>조회순 </option>
              <option>추천순 </option>
              <option>답변순 </option>
            </select>
          </div>
        </div>
        <ReviewDetail
          review={currentReviews(reviews)}
          loading={loading}
        ></ReviewDetail>
      </div>

      {loading || (
        <Pagination
          postsPerPage={reviewsPerPage}
          totalPosts={reviews.length}
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

export default ReviewBoard;
