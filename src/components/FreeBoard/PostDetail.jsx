import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
//
import profile from "../../images/profile.svg";
import like from "../../images/like_btn.svg";
import commentIcon from "../../images/comment_btn.svg";
import Loading from "../Loading";

const PostDetail = (props) => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const post = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(post.data);

      const comment = await axios.get(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setComment(comment.data);

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <article className="p-4">
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

        <div className="flex">
          {/* 좋아요 개수 */}
          <img className="pr-1" src={like} alt="like-button" />
          <span className="pr-2 text-red">
            {Math.floor(Math.random() * 11)}
          </span>
          {/* 댓글 개수 */}
          <img className="pr-1" src={commentIcon} alt="comment-button" />
          <span className="text-primary">{comment.length}</span>
        </div>
      </article>

      {/* 댓글 */}
    </>
  );
};

export default PostDetail;
