import React from "react";
//
import { Link } from "react-router-dom";
//
import like from "../../images/like_btn.svg";
import comment from "../../images/comment_btn.svg";

const Post = ({ post }) => (
  <Link to={{ pathname: `/community/post/${post.id}` }}>
    <div className="h-30 p-5 border-b border-gray-border" key={post.id}>
      <h2 className="text-base truncate mb-1">{post.title}</h2>
      <p className="text-sm text-gray line-clamp-2 mb-1">{post.body}</p>
      <div className="flex justify-between text-xs">
        <div className="">
          <span className="text-gray-light mr-1">00/00/00</span>
          <span>{`유저 ${post.userId}`}</span>
        </div>
        <div className="flex">
          {/* 좋아요 개수 */}
          <img className="pr-1" src={like} alt="like-button" />
          <span className="pr-2 text-red">
            {Math.floor(Math.random() * 11)}
          </span>
          {/* 댓글 개수 */}
          <img className="pr-1" src={comment} alt="comment-button" />
          <span className="text-primary">{Math.floor(Math.random() * 11)}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default Post;
