import React from 'react';
//
import { Link } from 'react-router-dom';
//
import like from '../../images/like_btn.svg';
import comment from '../../images/comment_btn.svg';
import { timeForToday } from '../helpers';

const Post = ({ post }) => (
  <Link to={{ pathname: `/community/posts/${post.id}` }}>
    <div className="h-30 p-5 border-b border-gray-border" key={post.id}>
      <h2 className="text-base truncate mb-1">{post.title}</h2>
      <p className="text-sm text-gray line-clamp-2 mb-1">{post.content}</p>
      <div className="flex justify-between text-xs">
        <div className="">
          <span className="text-gray-light mr-1">
            {timeForToday(post.created_at)}
          </span>
          <span>{post.user}</span>
        </div>
        <div className="flex">
          {/* 좋아요 개수 */}
          <img className="pr-1" src={like} alt="like-button" />
          <span className="pr-2 text-red">{post.like_count}</span>
          {/* 댓글 개수 */}
          <img className="pr-1" src={comment} alt="comment-button" />
          <span className="text-primary">{post.comment_count}</span>
        </div>
      </div>
    </div>
  </Link>
);

export default Post;
