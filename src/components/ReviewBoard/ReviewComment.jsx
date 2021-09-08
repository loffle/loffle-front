import React from "react";
//
import back from "../../images/back.svg";
import profile from "../../images/profile.svg";
import pencil from "../../images/pencil.svg";

const ReviewComment = ({ review, handleCommentModal }) => (
  <>
    <div
      className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-20"
      onClick={handleCommentModal}
    >
      <div
        className="absolute bottom-0 px-5 py-4 w-full rounded-t-xl bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{ height: "91.5%" }}
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
              <h3 className="text-sm font-bold">유저 {review.id}</h3>
              <p className="text-base mt-2">
                {review.title}
                {review.title}
                {review.title}
                {review.title}
                {review.title}
              </p>
              <div className="text-xs text-gray-light mt-1">
                <span>00-00-00</span>
                <span> • </span>
                <span>
                  좋아요 <strong>{Math.floor(Math.random() * 101)}</strong>개
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    {/* 댓글 작성 - sticky 충돌나서 fixed로 수정*/}
    <div className="max-w-480 fixed bottom-4 left-0 right-0 flex items-center justify-between mx-6 z-50">
      <div className="flex justify-between px-3 py-1 w-10/12 h-14 bg-white rounded-2xl shadow-lg">
        <input
          className="w-full outline-none"
          type="text"
          name="text"
          maxLength="300"
          placeholder="댓글을 입력하세요."
          autoComplete="false"
        />
      </div>
      <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
        <img className="w-5 h-5" src={pencil} alt="write-comment-button" />
      </div>
    </div>
  </>
);

export default ReviewComment;
