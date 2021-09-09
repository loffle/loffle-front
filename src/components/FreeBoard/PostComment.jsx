import React from "react";
import profile from "../../images/profile.svg";
import { timeForToday } from "../helpers";

const Comment = ({ comment }) => {
  return (
    <div className="p-5 border-b border-gray-border">
      {/* 상단 */}
      <div className="flex justify-between mb-2">
        <div className="flex">
          <img className="w-6 h-6" src={profile} alt="" />
          <h3 className="text-sm pl-2 font-bold">{comment.user}</h3>
        </div>
        <div className="text-sm">
          <span className="text-gray-light">수정</span>
          <span
            className="text-gray-light pl-4"
            onClick={() => alert("정말 삭제하시겠습니까?")}
          >
            삭제
          </span>
        </div>
      </div>

      {/* 본문 */}
      <p className="mb-1">{comment.content}</p>

      {/* 작성일 */}
      <span className="text-gray-light text-sm">
        {timeForToday(comment.created_at)}
      </span>
    </div>
  );
};

export default Comment;
