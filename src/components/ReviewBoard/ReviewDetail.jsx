import React, { useEffect, useState } from "react";
import Share from "../Share";
import Loading from "../Loading";
import { timeForToday } from "../helpers";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
import ReviewComment from "./ReviewComment";
import { PROXY } from "../../config";
import { useParams } from "react-router";

const ReviewDetail = ({ review }) => {
  const { reviewId } = useParams();
  const [reviewDetail, setReviewDetail] = useState(review); //review/{reviewId} 보여주기 위해서 새로 선언
  const [loading, setLoading] = useState(false);
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
    setReviewDetail(review); //review가 있거나 없거나 reviewDetail에 set

    async function fetchData() {
      //review가 없는 상태(param으로 접근) fetch
      setLoading(true);

      const review = await (
        await fetch(`${PROXY}/community/review/${reviewId}.json`, {
          headers: { Authorization: `Token ${localStorage.access_token}` },
          //header에 token을 실어 보내야 like_or_not 확인이 가능하다
        })
      ).json();
      setReviewDetail(review);

      setLoading(false);
    }

    if (review === undefined) fetchData();
  }, [review]);

  useEffect(() => {
    async function fetchData() {
      const data = await (
        await fetch(`${PROXY}/community/review/${reviewDetail.id}/comment.json`)
      ) //reviewDetail.id 하드코딩 한 상태
        .json();
      await setComments(data.results);
    }
    if (reviewDetail) fetchData(); //reiview undefined check
  }, [reviewDetail]);

  //console.log(review); review 여러번 렌더링 및 undefined inssue

  return (
    <>
      {loading && <Loading />}

      {/* API 보고 Share 기능 어떻게 할지 생각! */}
      {/* review && - 즉, undefined 체크 안하면 오류 겁나뜸 ㅂㄷㅂㄷㅂㄷㅂ */}
      {reviewDetail && isShareModalOn && (
        <Share id={`/${reviewDetail.id}`} handleShareModal={handleShareModal} />
      )}

      {comments && reviewDetail && isCommentModalOn && (
        <ReviewComment
          review={reviewDetail}
          comments={comments}
          handleCommentModal={handleCommentModal}
        />
      )}

      {/* 로딩 전에 부르면 오류남... 이거 때매 undifined 1시간 고생 ㅜㅜ */}
      {reviewDetail && (
        <article className="border-b border-gray-border">
          {/* header */}
          <div className="flex justify-between p-4">
            <div className="flex">
              <img className="w-9 h-9" src={profile} alt="profile" />
              <div className="leading-3 pl-2">
                <h3 className="text-sm font-bold">{reviewDetail.user}</h3>
                <span className="text-xs text-gray-light">
                  {timeForToday(reviewDetail.created_at)}
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
          <img
            src="http://benzol4.com/wp-content/uploads/2018/11/blog-ph-1.jpg"
            alt="main"
          />

          {/* related item */}
          <div className="flex p-4 border-b border-gray-border">
            <img
              src="http://benzol4.com/wp-content/uploads/2018/11/blog-ph-1.jpg"
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
                좋아요 <strong>{reviewDetail.like_count}</strong>개
              </span>
              <span onClick={() => handleCommentModal()}>
                댓글 <strong>{reviewDetail.comment_count}</strong>개
              </span>
            </div>
            {/* 내용 */}
            <p className="text-base mt-4">{reviewDetail.content}</p>
          </div>
        </article>
      )}
    </>
  );
};

export default ReviewDetail;
