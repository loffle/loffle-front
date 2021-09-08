import React, { useState } from "react";
import Loading from "../Loading";
import Share from "../Share";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
import ReviewComment from "./ReviewComment";

const ReviewDetail = ({ review, loading }) => {
  //공유버튼 모달
  const [isShareModalOn, setIsShareModalOn] = useState(false);
  const handleShareModal = (e) => {
    setIsShareModalOn(!isShareModalOn);
  };

  //댓글 모달
  const [isCommentModalOn, setIsCommentModalOn] = useState(false);
  const handleCommentModal = (e) => {
    setIsCommentModalOn(!isCommentModalOn);
  };

  //console.log(review); review 여러번 렌더링 및 undefined inssue

  return (
    <>
      {loading && <Loading />}

      {/* API 보고 Share 기능 어떻게 할지 생각! */}
      {/* review && - 즉, undefined 체크 안하면 오류 겁나뜸 ㅂㄷㅂㄷㅂㄷㅂ */}
      {review && isShareModalOn && (
        <Share id={review.id} handleShareModal={handleShareModal} />
      )}

      {review && isCommentModalOn && (
        <ReviewComment
          review={review}
          handleCommentModal={handleCommentModal}
        />
      )}

      {/* 로딩 전에 부르면 오류남... 이거 때매 undifined 1시간 고생 ㅜㅜ */}
      {review && (
        <article className="border-b border-gray-border">
          {/* header */}
          <div className="flex justify-between p-4">
            <div className="flex">
              <img className="w-9 h-9" src={profile} alt="profile" />
              <div className="leading-3 pl-2">
                <h3 className="text-sm font-bold">유저 {review.id}</h3>
                <span className="text-xs text-gray-light">00-00-00</span>
              </div>
            </div>
            <div className="text-sm">
              <span className="text-gray-light">수정</span>
              <span
                className="text-gray-light pl-3"
                onClick={() => alert("정말 삭제하시겠습니까?")}
              >
                삭제
              </span>
            </div>
          </div>
          {/* image */}
          <img src={review.url} alt="main" />

          {/* related item */}
          <div className="flex p-4 border-b border-gray-border">
            <img
              src={review.thumbnailUrl}
              alt="thumbnail"
              className="w-16 rounded-lg"
            />
            <div className="ml-2 text-sm">
              <span className="line-clamp-2 pr-2">
                [<strong>{Math.floor(Math.random() * 101)}회</strong> 당첨 제품]{" "}
                {review.title}
              </span>
              <span>
                <strong>1,{Math.floor(Math.random() * 1000)},000원</strong>
              </span>
            </div>
          </div>

          {/* buttons */}
          <div className=" opacity-80 flex items-center justify-between mt-3 px-4 pb-4 text-lg">
            <div className="flex gap-4">
              {/* likes  */}
              <img className="pr-1 w-8" src={like} alt="like-button" />
              {/* comments */}
              <img
                onClick={() => handleCommentModal()}
                className="pr-1 w-8"
                src={commentIcon}
                alt="comment-button"
              />
            </div>
            <div className="flex">
              <button onClick={() => handleShareModal()}>
                <img className="w-6" src={share} alt="shate-button" />
              </button>
            </div>
          </div>

          {/* like counts & body */}
          <div className="px-4 pb-4 text-sm">
            <div className="flex justify-between">
              <span>
                좋아요 <strong>{Math.floor(Math.random() * 101)}</strong>개
              </span>
              <span onClick={() => handleCommentModal()}>
                댓글 <strong>{Math.floor(Math.random() * 101)}</strong>개
              </span>
            </div>
            {/* 내용 */}
            <p className="text-base mt-4">
              {review.title}
              {review.title}
              {review.title}
              {review.title}
              {review.title}
            </p>
          </div>
        </article>
      )}
    </>
  );
};

export default ReviewDetail;
