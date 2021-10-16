import React from 'react';
import profile from '../../../images/profile.svg';
import { timeForToday } from '../../helpers';
import API from '../../../API';

const Comment = ({
  category,
  comment,
  comments,
  setComments,
  postId,
  lastCommentElementRef,
}) => {
  const handleDelete = () => {
    if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
      API.deleteComment(category, postId, comment.id) //
        .then((response) => {
          console.log(response);
          if (response.ok) {
            setComments(
              comments.filter(
                (originalComment) => originalComment.id !== comment.id
              )
            );
            alert('댓글이 삭제되었습니다.');
          }
        });
    }
  };

  return (
    <div
      className="p-5 border-b border-gray-border"
      ref={lastCommentElementRef}
    >
      {/* 상단 */}
      <div className="flex justify-between mb-2">
        <div className="flex">
          <img className="w-6 h-6" src={profile} alt="" />
          <h3 className="text-sm pl-2 font-bold">{comment.user}</h3>
        </div>
        <div className="text-sm">
          {comment.user === localStorage.access_nickname && ( //권한
            <span className="text-gray-light ml-4" onClick={handleDelete}>
              삭제
            </span>
          )}
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
