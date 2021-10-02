import React, { useCallback, useRef, useState } from "react";
import { timeForToday } from "../helpers";
//
import Comment from "../FreeBoard/Comment/Comment";
//
import back from "../../images/back.svg";
import profile from "../../images/profile.svg";
import { useCommentFetch } from "../../hooks/useCommentFetch";
import ModalComentCreate from "../ModalComentCreate";

const ReviewComment = ({ review, postId, handleCommentModal }) => {
  const scrollBox = useRef(null);

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollBox.current;

    scrollBox.current.scrollTop = scrollHeight - clientHeight;
  };

  const [pageNumber, setPageNumber] = useState(1); //댓글 pageNumber
  const { comments, setComments, commentLoading, hasMore } = useCommentFetch(
    "review",
    pageNumber,
    postId
  );

  const observer = useRef();
  const lastCommentElementRef = useCallback(
    //useCallback: 이 함수를 호출한 node를 가져온다
    (node) => {
      if (commentLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1); //다음 페이지를 가져오라고 한다
        }
      });
      if (node) observer.current.observe(node);
    },
    [commentLoading, hasMore]
  );

  return (
    <>
      <div
        className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-20"
        onClick={handleCommentModal}
      >
        <div
          className="absolute bottom-0 px-5 pt-4 pb-20 w-full rounded-t-xl bg-white overflow-scroll"
          onClick={(e) => e.stopPropagation()}
          style={{ height: "92%" }}
          ref={scrollBox}
        >
          <header className="flex justify-between">
            <img src={back} alt="back-button" onClick={handleCommentModal} />
            <h1 className="text-lg font-bold">댓글</h1>
            <div></div>
          </header>

          <article className="mt-4 pb-4 border-b border-gray-border">
            <div className="flex items-start">
              <img src={profile} alt="profile" className="w-8" />
              <div className="ml-2">
                <h3 className="text-sm font-bold">{review.user}</h3>
                <p className="text-base mt-2">{review.content}</p>
                <div className="text-xs text-gray-light mt-1">
                  <span>{timeForToday(review.created_at)}</span>
                  <span> • </span>
                  <span>
                    좋아요 <strong>{review.like_count}</strong>개
                  </span>
                </div>
              </div>
            </div>
          </article>
          {comments.map((comment, index) => {
            if (comments.length === index + 1) {
              return (
                <Comment
                  category={"review"}
                  key={comment.id}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  postId={postId}
                  lastCommentElementRef={lastCommentElementRef}
                ></Comment>
              );
            } else {
              return (
                <Comment
                  category={"review"}
                  key={comment.id}
                  comment={comment}
                  comments={comments}
                  setComments={setComments}
                  postId={postId}
                ></Comment>
              );
            }
          })}
        </div>
      </div>

      {/* 댓글 작성 - sticky 충돌나서 fixed로 수정*/}
      <ModalComentCreate
        category={"review"}
        postId={postId}
        comments={comments}
        setComments={setComments}
        scrollToBottom={scrollToBottom}
        hasMore={hasMore}
      />
    </>
  );
};

export default ReviewComment;
