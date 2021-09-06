import React, { useState } from "react";
import doublePrevious from "../images/double_previous.svg";
import doubleNext from "../images/double_next.svg";
import pencil from "../images/pencil.svg";
import { Link } from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  const lastPageNumber = Math.ceil(totalPosts / postsPerPage);

  //   개드립넷 페이지네이션 참조
  if (currentPage <= 3) {
    for (let i = 1; i <= 5; i++) {
      pageNumbers.push(i);
    }
  } else if (currentPage >= 4 && currentPage <= lastPageNumber - 3) {
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      pageNumbers.push(i);
    }
  } else {
    for (let i = lastPageNumber - 4; i <= lastPageNumber; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <div className="sticky bottom-3 flex items-center justify-between mx-3">
        <nav className="flex justify-between w-10/12 h-14 bg-white rounded-2xl shadow-lg">
          <ul className="flex items-center w-full justify-evenly text-gray-light">
            {/* 첫페이지로 이동 */}
            <button onClick={() => paginate(1)}>
              <img className="opacity-70" src={doublePrevious} alt="" />
            </button>
            {/* 페이지 번호 보여주기 */}
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  className="focus:text-gray-dark"
                  onClick={() => paginate(number)}
                >
                  {number}
                </button>
              </li>
            ))}
            {/* 마지막 페이지로 이동 */}
            <button onClick={() => paginate(lastPageNumber)}>
              <img className="opacity-70" src={doubleNext} alt="" />
            </button>
          </ul>
        </nav>

        {/* 게시물 작성 버튼 */}
        <Link to={{ pathname: "/community/post/create" }}>
          <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
            <img className="w-5 h-5" src={pencil} alt="write-post-button" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Pagination;
