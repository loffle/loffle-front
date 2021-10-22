import React, { useState } from 'react';
import { useFreeBoardFetch } from '../../hooks/useFreeBoardFetch';
import NewPagination from '../NewPagination';
import FreeBoardLists from './FreeBoardLists';

import Loading from '../Loading';
import CreateButton from '../CreateButton';
import PostCreate from './PostCreate';

const FreeBoard = (props) => {
  window.scrollTo(0, 0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('');

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
      {loading && <Loading />}
      {loading ||
        (createMode ? (
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
          </>
        ))}
    </>
  );
};

export default FreeBoard;
