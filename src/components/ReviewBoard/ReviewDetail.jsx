import React, { useEffect, useState } from "react";
import Share from "../Share";
import Loading from "../Loading";
import { timeForToday } from "../helpers";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import likeActive from "../../images/like_active_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
import ReviewComment from "./ReviewComment";
import { PROXY } from "../../config";
import { useNavigate, useParams } from "react-router";
import ReviewUpdate from "./ReviewUpdate";

const ReviewDetail = ({ review }) => {
  const { reviewId } = useParams();
  const [reviewDetail, setReviewDetail] = useState(review); //review/{reviewId} 보여주기 위해서 새로 선언
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); //Naviagte hook 사용

  //공유버튼 모달
  const [isShareModalOn, setIsShareModalOn] = useState(false);
  const handleShareModal = (e) => {
    setIsShareModalOn(!isShareModalOn);
    isShareModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
  };

  //댓글 모달
  const [isCommentModalOn, setIsCommentModalOn] = useState(false);
  const handleCommentModal = (e) => {
    setIsCommentModalOn(!isCommentModalOn);
    isCommentModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
  };

  //수정 토글 버튼
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const handleUpdate = (e) => {
    setIsUpdateOn(!isUpdateOn);
    isUpdateOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = "unset")
      : (document.body.style.overflow = "hidden");
  };

  //좋아요
  const [likeCount, setLikeCount] = useState(review ? review.like_count : ""); //좋아요 개수
  const [likeToggle, setLikeToggle] = useState(
    review ? review.like_or_not : ""
  ); //좋아요 여부

  useEffect(() => {
    setReviewDetail(review); //review가 있거나 없거나 reviewDetail에 set

    async function fetchData() {
      //review가 없는 상태(param으로 접근) fetch
      setLoading(true);

      var myHeaders = new Headers();
      if (localStorage.access_token) {
        //토큰이 있을때만 header 첨부
        myHeaders.append("Authorization", `Token ${localStorage.access_token}`);
      }

      const review = await (
        await fetch(`${PROXY}/community/review/${reviewId}.json`, {
          headers: myHeaders,
          //header에 token을 실어 보내야 like_or_not 확인이 가능하다
        })
      ).json();
      setReviewDetail(review);
      setLikeCount(review.like_count); //좋아요 세팅
      setLikeToggle(review.like_or_not);

      setLoading(false);
    }

    if (review === undefined) fetchData();
  }, [review, reviewId]);

  const handleDelete = () => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다."
      )
    ) {
      fetch(`${PROXY}/community/review/${reviewDetail.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.access_token}`,
        },
      }).then((response) => {
        alert("게시물이 삭제되었습니다.");
        if (reviewId) navigate(`/community/review`);
        //detail 페이지면 리스트로 보여주기
        else window.location.reload(); //detail이 아니면 그냥 새로고침
      });
    }
  };

  const handleLike = () => {
    if (likeToggle === false) {
      fetch(`${PROXY}/community/review/${reviewDetail.id}/add-like`, {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.access_token}`,
        },
      })
        .then((response) => {
          //공감 요청
          setLikeToggle(true);
          setLikeCount(likeCount + 1);
        })
        .catch((error) => console.log("error", error));
    }
    if (likeToggle === true) {
      fetch(`${PROXY}/community/review/${reviewDetail.id}/add-like`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.access_token}`,
        },
      })
        .then((response) => {
          //공감 취소 요청
          setLikeToggle(false);
          setLikeCount(likeCount - 1);
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <>
      {loading && <Loading />}

      {/* review && - 즉, undefined 체크 안하면 오류 겁나뜸 ㅂㄷㅂㄷㅂㄷㅂ */}
      {reviewDetail &&
        isShareModalOn &&
        (review ? (
          <Share
            id={`/${reviewDetail.id}`}
            handleShareModal={handleShareModal}
          />
        ) : (
          <Share handleShareModal={handleShareModal} />
        ))}

      {reviewDetail && isUpdateOn && (
        <ReviewUpdate
          reviewId={reviewDetail.id}
          review={reviewDetail}
          handleUpdate={handleUpdate}
        />
      )}

      {reviewDetail && isCommentModalOn && (
        <ReviewComment
          review={reviewDetail}
          postId={reviewDetail.id}
          handleCommentModal={handleCommentModal}
        />
      )}

      {reviewId && (
        <header className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold">당첨 후기 게시판</h1>
          <button
            className="text-gray-light"
            onClick={() => navigate(`/community/review`)}
          >
            목록으로
          </button>
        </header>
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
              <button onClick={handleUpdate}>
                <span className="text-gray-light">수정</span>
              </button>
              <button onClick={handleDelete}>
                <span className="text-gray-light pl-3">삭제</span>
              </button>
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
              <button onClick={handleLike}>
                {likeToggle ? (
                  <img
                    className="pr-1 w-8"
                    src={likeActive}
                    alt="like-active-button"
                  />
                ) : (
                  <img className="pr-1 w-8" src={like} alt="like-button" />
                )}
              </button>

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
                좋아요{" "}
                <strong>
                  {likeCount === undefined
                    ? reviewDetail.like_count
                    : likeCount}
                </strong>
                개
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
