import React from 'react';
import './paging.module.css';
import Pagination from 'react-js-pagination';

const NewPagination = ({
  pageNumber,
  setPageNumber,
  totalPosts,
  itemsCountPerPage,
  children,
}) => {
  return (
    <>
      <div className="sticky bottom-4 flex items-center justify-between mx-3">
        <nav className="flex justify-between w-full h-14 bg-white rounded-2xl shadow-lg">
          <Pagination
            activePage={pageNumber}
            itemsCountPerPage={itemsCountPerPage}
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
