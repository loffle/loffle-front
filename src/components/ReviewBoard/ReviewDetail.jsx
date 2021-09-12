import React, { useEffect, useState } from "react";
import Share from "../Share";
import { timeForToday } from "../helpers";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
import ReviewComment from "./ReviewComment";

const ReviewDetail = ({ review }) => {
  const [comments, setComments] = useState([]);
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

  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch(`/community/review/${review.id}/comment.json`)
      ) //review.id 하드코딩 한 상태
        .json();
      await setComments(data.results);
    }
    if (review) fetchData(); //reiview undefined check
  }, [review]);

  //console.log(review); review 여러번 렌더링 및 undefined inssue

  return (
    <>
      {/* API 보고 Share 기능 어떻게 할지 생각! */}
      {/* review && - 즉, undefined 체크 안하면 오류 겁나뜸 ㅂㄷㅂㄷㅂㄷㅂ */}
      {review && isShareModalOn && (
        <Share id={review.id} handleShareModal={handleShareModal} />
      )}

      {comments && review && isCommentModalOn && (
        <ReviewComment
          review={review}
          comments={comments}
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
                <h3 className="text-sm font-bold">{review.user}</h3>
                <span className="text-xs text-gray-light">
                  {timeForToday(review.created_at)}
                </span>
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
                [<strong>? 회</strong> 당첨 제품] ?:제품명
              </span>
              <span>
                <strong>? 원</strong>
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
                좋아요 <strong>{review.like_count}</strong>개
              </span>
              <span onClick={() => handleCommentModal()}>
                댓글 <strong>{review.comment_count}</strong>개
              </span>
            </div>
            {/* 내용 */}
            <p className="text-base mt-4">{review.content}</p>
          </div>
        </article>
      )}
    </>
  );
};

export default ReviewDetail;
