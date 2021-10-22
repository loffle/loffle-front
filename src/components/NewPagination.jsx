import React from 'react';
import { useNavigate } from 'react-router-dom';
import './paging.module.css';
import Pagination from 'react-js-pagination';

const NewPagination = ({
  pageNumber,
  setPageNumber,
  totalPosts,
  itemsCountPerPage,
  children,
}) => {
  const navigate = useNavigate();

  const onChange = (num) => {
    navigate(`/community/posts?page=${num}`);
    setPageNumber(num);
  };

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
            onChange={onChange}
          ></Pagination>
        </nav>
        {children}
      </div>
    </>
  );
};

export default NewPagination;
