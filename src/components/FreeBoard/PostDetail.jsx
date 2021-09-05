import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//
import Share from "../Share";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import share from "../../images/share.svg";
import commentIcon from "../../images/comment_btn.svg";
import Loading from "../Loading";
import Comment from "./Comment";

const PostDetail = (props) => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  //공유버튼 모달
  const [isShareModalOn, setIsShareModalOn] = useState(false);
  const handleShareModal = (e) => {
    setIsShareModalOn(!isShareModalOn);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const post = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(post.data);

      const comments = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setComments(comments.data);

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {isShareModalOn && <Share handleShareModal={handleShareModal} />}
      <article className="p-4 border-b border-gray-light">
        <div className="flex justify-between mb-4">
          <div className="flex">
            <img className="w-11 h-11" src={profile} alt="" />
            <div className="pl-3">
              <h3 className="font-bold">{`유저 ${post.userId}`}</h3>
              <span className="text-gray-light">00-00-00</span>
            </div>
          </div>
          <div>
            <span className="text-gray-light">수정</span>
            <span
              className="text-gray-light pl-4"
              onClick={() => alert("정말 삭제하시겠습니까?")}
            >
              삭제
            </span>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-2xl font-bold line-clamp-2 mb-4">{post.title}</h1>
        {/* 내용 */}
        <p className="text-base mb-4">{post.body}</p>

        <div className="flex items-center justify-between text-lg">
          <div className="flex opacity-80 gap-3">
            {/* <img
              className="w-5 h-5"
              src={contentList}
              alt="content-list-button"
            /> */}
            <button onClick={() => handleShareModal()}>
              <img className="w-4 h-4" src={share} alt="shate-button" />
            </button>
          </div>
          <div className="flex">
            {/* 좋아요 개수 */}
            <img className="pr-1" src={like} alt="like-button" />
            <span className="pr-3 text-red">
              {Math.floor(Math.random() * 11)}
            </span>
            {/* 댓글 개수 */}
            <img className="pr-1" src={commentIcon} alt="comment-button" />
            <span className="text-primary">{comments.length}</span>
          </div>
        </div>
      </article>

      {/* 댓글 */}
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </>
  );
};

export default PostDetail;
