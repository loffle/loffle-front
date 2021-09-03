import React from "react";
import likeBtn from "../../images/like_btn.svg";
import commentBtn from "../../images/comment_btn.svg";

const FreeBoardLists = ({ posts, loading }) => {
  //console.log(posts);

  return (
    <>
      {loading && (
        <div className="min-h-screen flex items-center justify-center flex-col">
          <h1 className="text-3xl">Loading...</h1>
          <div
            className="border-4 border-gray-light rounded-full w-12 h-12 animate-spin my-5 mx-auto"
            style={{ borderTop: `5px solid #353535` }}
          ></div>
        </div>
      )}
      <div className="max-w-480 ">
        {posts.map((post) => (
          <div className="h-30 p-5 border-b border-gray-light" key={post.id}>
            <h2 className="text-base truncate mb-1">{post.title}</h2>
            <p className="text-sm text-gray line-clamp-2 mb-1">{post.body}</p>
            <div className="flex justify-between text-xs">
              <div className="">
                <span className="text-gray-light mr-1">00/00/00</span>
                <span>{`유저 ${post.userId}`}</span>
              </div>
              <div className="flex">
                {/* 좋아요 개수 */}
                <img className="pr-1" src={likeBtn} alt="like-button" />
                <span className="pr-2 text-red">
                  {Math.floor(Math.random() * 11)}
                </span>
                {/* 댓글 개수 */}
                <img className="pr-1" src={commentBtn} alt="comment-button" />
                <span className="text-primary">
                  {Math.floor(Math.random() * 11)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FreeBoardLists;
