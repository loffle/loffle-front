import React from "react";
import { timeForToday } from "../helpers";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
//
import Comment from "./Comment/Comment";
import Share from "../Share";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommentCreate from "./Comment/CommentCreate";

const PostDetailContent = ({
  loading,
  postId,
  post,
  comments,
  handleUpdate,
}) => {
  const navigate = useNavigate(); //Naviagte hook 사용
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  //공유버튼 모달
  const [isShareModalOn, setIsShareModalOn] = useState(false);
  const handleShareModal = (e) => {
    setIsShareModalOn(!isShareModalOn);
  };

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
        navigate(`${PROXY}/community/post`);
      });
    }
  };

  return (
    <>
      {isShareModalOn && <Share handleShareModal={handleShareModal} />}

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
            <img className="pr-1" src={like} alt="like-button" />
            <span className="pr-3 text-red">{post.like_count}</span>
            {/* 댓글 개수 */}
            <img className="pr-1" src={commentIcon} alt="comment-button" />
            <span className="text-primary">
              {comments ? comments.length : 0}
            </span>
          </div>
        </div>
      </article>

      {/* 댓글 */}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}

      {/* 댓글 작성 */}
      {loading || <CommentCreate postId={postId} />}
    </>
  );
};

export default PostDetailContent;
