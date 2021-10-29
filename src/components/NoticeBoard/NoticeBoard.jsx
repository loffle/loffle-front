import React, { useCallback, useRef, useState } from 'react';
import { useInfinityScrollFetch } from '../../hooks/useInfinityScrollFetch';
//
import Skeleton from './Skeleton';
import Notice from './Notice';

const NoticeBoard = (props) => {
  const [pageNumber, setPageNumber] = useState(1);

  const {
    posts: notices,
    firstLoading,
    loading,
    hasMore,
  } = useInfinityScrollFetch('notices', pageNumber);

  const observer = useRef();
  const lastNoticeElementRef = useCallback(
    //useCallback: 이 함수를 호출한 node를 가져온다
    (node) => {
      if (loading) return; //로딩중에는 무시처리
      if (observer.current) observer.current.disconnect(); // 최근 observer를 갖기위해 이전 observer disconnect 해주기
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          //isIntersecting: 관찰 대상의 교차 상태로 전환되었는데의 여부를 나타냄(Boolean)주로 대상 요소의 수에 대한 카운터를 업데이트하는 데 사용됩니다.
          //더 로드할 것이 있는지 체크
          console.log('Visible'); // 대충 마지막 element가 보이면 여기를 출력한다. 휴.. 뭔 개소리일까..
          setPageNumber((prevPageNumber) => prevPageNumber + 1); //다음 페이지를 가져오라고 한다
        }
      });
      if (node) observer.current.observe(node); // 노드가 있으면 observer.current를 observe 해준다.
    },
    [loading, hasMore]
  );

  return (
    <>
      <div className="max-w-480 min-h-screen">
        <div className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold">공지사항</h1>
        </div>

        {firstLoading && (
          <>
            <Skeleton />
            <Skeleton />
          </>
        )}
        {notices.map((notice, index) => {
          if (notices.length === index + 1) {
            return (
              <Notice
                key={notice.id}
                notice={notice}
                lastNoticeElementRef={lastNoticeElementRef}
              ></Notice>
            );
          } else {
            return <Notice key={notice.id} notice={notice}></Notice>;
          }
        })}

        {hasMore && loading && (
          <div
            className="border-4 border-gray-light rounded-full w-8 h-8 animate-spin my-5 mx-auto"
            style={{ borderTop: `5px solid #353535` }}
          ></div>
        )}
      </div>
    </>
  );
};

export default NoticeBoard;
