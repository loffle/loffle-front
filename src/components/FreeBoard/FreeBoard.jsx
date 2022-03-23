/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useFreeBoardFetch } from '../../hooks/useFreeBoardFetch';
import QueryString from 'qs';
import NewPagination from '../NewPagination';
import FreeBoardLists from './FreeBoardLists';
//
import CreateButton from '../CreateButton';
import PostCreate from './PostCreate';
import { useLocation } from 'react-router-dom';
import { usePostDispatch } from '../../store/posts';

const FreeBoard = () => {
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

  const dispatch = usePostDispatch();
  const savePosts = () => dispatch({ type: 'SAVE', posts });

  useEffect(() => {
    if (posts.length > 0) {
      savePosts();
    }
  }, [posts]);

  const [createMode, setCreateMode] = useState(false);
  const handleCreateMode = () => {
    setCreateMode((prev) => !prev);
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
