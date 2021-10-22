import React, { useState } from 'react';
import { useFreeBoardFetch } from '../../hooks/useFreeBoardFetch';
import QueryString from 'qs';
import NewPagination from '../NewPagination';
import FreeBoardLists from './FreeBoardLists';
//
import CreateButton from '../CreateButton';
import PostCreate from './PostCreate';
import { useLocation } from 'react-router-dom';

const FreeBoard = (props) => {
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  window.scrollTo(0, 0);
  const [pageNumber, setPageNumber] = useState(
    queryData.page ? +queryData.page : 1
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('최신순');

  const { posts, loading, totalPosts } = useFreeBoardFetch(
    'posts',
    pageNumber,
    order,
    searchTerm
  );

  const [createMode, setCreateMode] = useState(false);
  const handleCreateMode = () => {
    setCreateMode(!createMode);
  };

  return (
    <>
      {createMode ? (
        <PostCreate handleCreateMode={handleCreateMode} />
      ) : (
        <>
          <FreeBoardLists
            posts={posts}
            loading={loading}
            setOrder={setOrder}
            setPageNumber={setPageNumber}
            setSearchTerm={setSearchTerm}
          ></FreeBoardLists>
          {totalPosts > 0 && (
            <NewPagination
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              totalPosts={totalPosts}
              itemsCountPerPage={5}
            >
              {/* 게시물 작성 버튼 */}
              {localStorage.access_token && (
                <CreateButton handleCreateMode={handleCreateMode} />
              )}
            </NewPagination>
          )}
          )
        </>
      )}
    </>
  );
};

export default FreeBoard;
