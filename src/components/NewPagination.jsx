import React from "react";
import "./paging.css";
import Pagination from "react-js-pagination";

const NewPagination = ({ pageNumber, setPageNumber, totalPosts, children }) => {
  return (
    <>
      <div className="sticky bottom-4 flex items-center justify-between mx-3">
        <nav className="flex justify-between w-11/12 h-14 bg-white rounded-2xl shadow-lg">
          <Pagination
            activePage={pageNumber}
            itemsCountPerPage={5}
            totalItemsCount={totalPosts}
            pageRangeDisplayed={5}
            hideNavigation
            onChange={setPageNumber}
          />
        </nav>
        {children}
      </div>
    </>
  );
};

export default NewPagination;
