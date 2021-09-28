import React, { useCallback, useRef, useState, useEffect } from "react";
import { timeForToday } from "../helpers";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import likeActive from "../../images/like_active_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
//
import Comment from "./Comment/Comment";
import Share from "../Share";
import { useNavigate } from "react-router-dom";
import CommentCreate from "./Comment/CommentCreate";
import { useCommentFetch } from "../../hooks/useCommentFetch";

const PostDetailContent = ({ loading, postId, post, handleUpdate }) => {
  const [pageNumber, setPageNumber] = useState(1); //댓글 pageNumber
  const { comments, commentCount, commentLoading, hasMore } = useCommentFetch(
    "post",
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

  const navigate = useNavigate(); //Naviagte hook 사용
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  //공유버튼 모달
  const [isShareModalOn, setIsShareModalOn] = useState(false);
  const handleShareModal = (e) => {
    setIsShareModalOn(!isShareModalOn);
  };

  //좋아요
  const [likeCount, setLikeCount] = useState(post.like_count); //좋아요 개수
  const [likeToggle, setLikeToggle] = useState(post.like_or_not); //좋아요 여부

  useEffect(() => {
    //props에서 불러온 값 세팅
    setLikeCount(post.like_count);
    setLikeToggle(post.like_or_not);
  }, [post.like_count, post.like_or_not]);

  const handleDelete = () => {
    if (
      window.confirm(
        "해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다."
      )
    ) {
      fetch(`${PROXY}/community/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.access_token}`,
        },
      }).then((response) => {
        alert("게시물이 삭제되었습니다.");
        navigate(`/community/post`);
      });
    }
  };

  const handleLike = () => {
    if (likeToggle === false) {
      fetch(`${PROXY}/community/post/${postId}/add-like`, {
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
      fetch(`${PROXY}/community/post/${postId}/add-like`, {
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
      {isShareModalOn && <Share handleShareModal={handleShareModal} />}
      <header className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
        <h1 className="text-xl font-bold">자유게시판</h1>
        <button
          className="text-gray-light"
          onClick={() => navigate(`/community/post`)}
        >
          목록으로
        </button>
      </header>
      <article className="p-4 border-b border-gray-light">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <img className="w-11 h-11" src={profile} alt="profile" />
            <div className="pl-3">
              <h3 className="font-bold">{post.user}</h3>
              <span className="text-gray-light">
                {timeForToday(post.created_at)}
              </span>
            </div>
          </div>
          <div>
            <span className="text-gray-light" onClick={handleUpdate}>
              수정
            </span>
            <span className="text-gray-light pl-4" onClick={handleDelete}>
              삭제
            </span>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold line-clamp-2 mb-4">{post.title}</h1>
        {/* 내용 */}
        <p className="text-base mb-4">{post.content}</p>

        <div className="flex items-center justify-between text-lg">
          <div className="flex opacity-80 gap-3">
            <button onClick={() => handleShareModal()}>
              <img className="w-4 h-4" src={share} alt="shate-button" />
            </button>
          </div>
          <div className="flex">
            {/* 좋아요 개수 */}
            {likeToggle ? (
              <img
                className="pr-1 w-5"
                src={likeActive}
                alt="like-active-button"
              />
            ) : (
              <img className="pr-1 w-5" src={like} alt="like-button" />
            )}
            <span className="pr-3 text-red" onClick={handleLike}>
              {likeCount === undefined ? post.like_count : likeCount}
              {/* 처음에 state가 undefined라 없으면 props에 있는거 보여주기 */}
            </span>
            {/* 댓글 개수 */}
            <img className="pr-1" src={commentIcon} alt="comment-button" />
            <span className="text-primary">
              {commentCount ? commentCount : 0}
            </span>
          </div>
        </div>
      </article>

      {/* 댓글 */}
      {comments.map((comment, index) => {
        if (comments.length === index + 1) {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
              lastCommentElementRef={lastCommentElementRef}
            ></Comment>
          );
        } else {
          return (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
            ></Comment>
          );
        }
      })}

      {/* 댓글 작성 */}
      {loading || <CommentCreate postId={postId} />}
    </>
  );
};

export default PostDetailContent;
