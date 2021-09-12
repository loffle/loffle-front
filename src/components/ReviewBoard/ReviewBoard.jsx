import React, { useState } from "react";
import { useReviewFetch } from "../../hooks/useReviewFetch";
import pencil from "../../images/pencil.svg";
import { Link } from "react-router-dom";
import ReviewDetail from "./ReviewDetail";
import Search from "../Search";
import Loading from "../Loading";
import search from "../../images/search_btn.svg";

const ReviewBoard = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");

  const {
    posts: reviews, //이거 때매 또 1시간 후... 빨간글씨면 의심하자
    loading,
    totalPosts,
  } = useReviewFetch("review", pageNumber, order, searchTerm);

  //Search Modal
  const [isSearchModalOn, setIsSearchModalOn] = useState(false);

  const handleSearchModal = (e) => {
    setIsSearchModalOn(!isSearchModalOn);
  };

  const handleSelect = (e) => {
    setOrder(e.target.value);
  };

  return (
    <>
      {loading && <Loading />}
      {isSearchModalOn && (
        <Search
          icon={search}
          setSearchTerm={setSearchTerm}
          handleSearchModal={handleSearchModal}
        />
      )}
      {reviews && (
        <div className="max-w-480 min-h-screen">
          <div className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
            <h1 className="text-xl font-bold">당첨 후기 게시판</h1>
            <div className="flex items-center">
              <button onClick={() => handleSearchModal()}>
                <img className="w-4 h-4" src={search} alt="search-button" />
              </button>
              <select
                onChange={handleSelect}
                className="text-gray h-5 ml-5 bg-white"
              >
                <option>최신순 </option>
                <option>과거순 </option>
              </select>
            </div>
          </div>

          {reviews.map((review) => (
            <ReviewDetail
              key={review.id}
              review={review}
              loading={loading}
            ></ReviewDetail>
          ))}
        </div>
      )}

      {loading || (
        <div className="sticky bottom-4 flex justify-end items-center mx-4">
          <Link to="/community/post/create">
            <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
              <img className="w-5 h-5" src={pencil} alt="write-post-button" />
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default ReviewBoard;
