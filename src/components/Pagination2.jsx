import React from "react";
import doublePrevious from "../images/double_previous.svg";
import doubleNext from "../images/double_next.svg";

const Pagination = ({
  children,
  postsPerPage,
  totalPosts,
  pageNumber,
  setPageNumber,
}) => {
  const pageNumbers = [];

  const lastPageNumber = Math.ceil(totalPosts / postsPerPage);

  // 9/12 아직 페이지 많을때 처리 안해놨음 수정 요망!
  if (pageNumber <= 3) {
    for (let i = 1; i <= lastPageNumber; i++) {
      pageNumbers.push(i);
    }
  } else if (pageNumber >= 4 && pageNumber <= lastPageNumber - 3) {
    for (let i = pageNumber - 2; i <= pageNumber + 2; i++) {
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
            <button onClick={() => setPageNumber(1)}>
              <img className="opacity-70" src={doublePrevious} alt="" />
            </button>
            {/* 페이지 번호 보여주기 */}
            {pageNumbers.map((number) => (
              <li key={number} className="page-item">
                <button
                  className="focus:text-gray-dark"
                  onClick={() => {
                    console.log(number);
                    setPageNumber(number);
                  }}
                >
                  {number}
                </button>
              </li>
            ))}
            {/* 마지막 페이지로 이동 */}
            <button onClick={() => setPageNumber(lastPageNumber)}>
              <img className="opacity-70" src={doubleNext} alt="" />
            </button>
          </ul>
        </nav>

        {children}
      </div>
    </>
  );
};

export default Pagination;
