import React from "react";
import { timeForToday } from "../helpers";
//
import PostComment from "../FreeBoard/PostComment";
//
import back from "../../images/back.svg";
import profile from "../../images/profile.svg";
import pencil from "../../images/pencil.svg";

const QuestionAnswer = ({ question, answers, handleAnswerModal }) => {
  return (
    <>
      <div
        className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-20"
        onClick={handleAnswerModal}
      >
        <div
          className="absolute bottom-0 px-5 py-4 w-full rounded-t-xl bg-white"
          onClick={(e) => e.stopPropagation()}
          style={{ height: "91.5%" }}
        >
          <header className="flex justify-between">
            <img src={back} alt="back-button" onClick={handleAnswerModal} />
            <h1 className="text-lg font-bold">답변</h1>
            <div></div>
          </header>

          <article className="mt-4 pb-4 border-b border-gray-border">
            <div className="flex items-start">
              <img src={profile} alt="profile" className="w-8" />
              <div className="ml-2">
                <h3 className="text-sm font-bold">{question.user}</h3>
                <p className="text-base mt-2">{question.title}</p>
                <div className="text-xs text-gray-light mt-1">
                  <span>{timeForToday(question.created_at)}</span>
                  <span> • </span>
                  <span>
                    좋아요 <strong>{question.like_count}</strong>개
                  </span>
                </div>
              </div>
            </div>
          </article>
          {answers &&
            answers.map((answer) => (
              <PostComment key={answer.id} comment={answer} />
            ))}
        </div>
      </div>

      {/* 댓글 */}

      {/* 댓글 작성 - sticky 충돌나서 fixed로 수정*/}
      <div className="max-w-480 fixed bottom-4 left-0 right-0 flex items-center justify-between mx-6 z-50">
        <div className="flex justify-between px-3 py-1 w-10/12 h-14 bg-white rounded-2xl shadow-lg">
          <input
            className="w-full outline-none"
            type="text"
            name="text"
            maxLength="300"
            placeholder="댓글을 입력하세요."
            autoComplete="false"
          />
        </div>
        <div className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl">
          <img className="w-5 h-5" src={pencil} alt="write-comment-button" />
        </div>
      </div>
    </>
  );
};

export default QuestionAnswer;