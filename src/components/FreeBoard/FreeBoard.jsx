import React, { useState } from 'react';
import { useFreeBoardFetch } from '../../hooks/useFreeBoardFetch';
import NewPagination from '../NewPagination';
import FreeBoardLists from './FreeBoardLists';

import Loading from '../Loading';
import CreateButton from '../CreateButton';

const FreeBoard = (props) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('');

  const { posts, loading, totalPosts } = useFreeBoardFetch(
    'posts',
    pageNumber,
    order,
    searchTerm
  );

  return (
    <>
      {loading && <Loading />}
      {loading || (
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
          >
            {/* 게시물 작성 버튼 */}
            <CreateButton to={'/community/posts/create'} />
          </NewPagination>
        </>
      )}
    </>
  );
};

export default FreeBoard;
