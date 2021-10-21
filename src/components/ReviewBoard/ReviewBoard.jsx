import React, { useCallback, useRef, useState } from 'react';
import { useInfinityScrollFetch } from '../../hooks/useInfinityScrollFetch';
//
import ReviewDetail from './ReviewDetail';
import Search from '../Search';
import Loading from '../Loading';
import CreateButton from '../CreateButton';
//
import search from '../../images/search_btn.svg';

const ReviewBoard = (props) => {
  window.scrollTo(0, 0);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState('');

  const {
    posts: reviews, //이거 때매 또 1시간 후... 빨간글씨면 의심하자
    firstLoading,
    loading,
    hasMore,
  } = useInfinityScrollFetch('reviews', pageNumber, order, searchTerm);

  const observer = useRef();
  const lastReviewElementRef = useCallback(
    //useCallback: 이 함수를 호출한 node를 가져온다
    (node) => {
      if (loading) return; //로딩중에는 무시처리
      if (observer.current) observer.current.disconnect(); // 최근 observer를 갖기위해 이전 observer disconnect 해주기
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          //isIntersecting: 관찰 대상의 교차 상태로 전환되었는데의 여부를 나타냄(Boolean)주로 대상 요소의 수에 대한 카운터를 업데이트하는 데 사용됩니다.
          //더 로드할 것이 있는지 체크
          console.log('Visible');
          setPageNumber((prevPageNumber) => prevPageNumber + 1); //다음 페이지를 가져오라고 한다
        }
      });
      if (node) observer.current.observe(node); // 노드가 있으면 observer.current를 observe 해준다.
    },
    [loading, hasMore]
  );

  //Search Modal
  const [isSearchModalOn, setIsSearchModalOn] = useState(false);
  const handleSearchModal = (e) => {
    setIsSearchModalOn(!isSearchModalOn);
  };

  const handleSelect = (e) => {
    setOrder(e.target.value);
  };

  //검색어 기록 및 불러오기
  const [lastSearchTerm, setLastSearchTerm] = useState('');

  return (
    <>
      {firstLoading && <Loading />}
      {isSearchModalOn && (
        <Search
          setPageNumber={setPageNumber}
          setSearchTerm={setSearchTerm}
          lastSearchTerm={lastSearchTerm}
          setLastSearchTerm={setLastSearchTerm}
          handleSearchModal={handleSearchModal}
        />
      )}
      {firstLoading ||
        (reviews && (
          <div className="max-w-480 min-h-screen">
            <header className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
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
            </header>

            {reviews.map((review, index) => {
              if (reviews.length === index + 1) {
                return (
                  <div key={review.id} ref={lastReviewElementRef}>
                    <ReviewDetail
                      review={review}
                      loading={loading}
                    ></ReviewDetail>
                  </div>
                );
              } else {
                return (
                  <div key={review.id}>
                    <ReviewDetail
                      review={review}
                      loading={loading}
                    ></ReviewDetail>
                  </div>
                );
              }
            })}

            {firstLoading ||
              (reviews.length === 0 && (
                <div className="flex justify-center pt-80">
                  <h1 className="text-lg">검색 내역 혹은 게시글이 없습니다.</h1>
                </div>
              ))}

            {hasMore && loading && (
              <div
                className="border-4 border-gray-light rounded-full w-8 h-8 animate-spin my-5 mx-auto"
                style={{ borderTop: `5px solid #353535` }}
              ></div>
            )}
          </div>
        ))}

      {firstLoading ||
        (localStorage.access_token && (
          <CreateButton to={'/community/reviews/create'} />
        ))}
    </>
  );
};

export default ReviewBoard;
