import React, { useEffect, useState } from "react";
//
import { timeForToday } from "../helpers";
import QuestionAnswer from "./QuestionAnswer";

const Question = ({ question, lastQuestionElementRef }) => {
  const [answers, setAnswers] = useState([]);

  //답글 모달
  const [isAnswerModalOn, setIsAnswerModalOn] = useState(false);
  const handleAnswerModal = (e) => {
    setIsAnswerModalOn(!isAnswerModalOn);
  };

  useEffect(() => {
    async function fetchData() {
      const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
      const data = await (
        await fetch(`${PROXY}/community/question/${question.id}/answer.json`)
      ).json();
      await setAnswers(data.results);
    }
    if (question) fetchData(); //reiview undefined check
  }, [question]);

  return (
    <>
      {answers && question && isAnswerModalOn && (
        <QuestionAnswer
          question={question}
          answers={answers}
          handleAnswerModal={handleAnswerModal}
        />
      )}

      <div
        className="h-30 m-5 rounded-lg shadow-lg"
        key={question.id}
        ref={lastQuestionElementRef}
        onClick={() => handleAnswerModal()}
      >
        <div className="flex p-4 ">
          <div className="w-7 h-7 rounded-full bg-gray-darkest flex justify-center items-center">
            <span className="text-white text-sm">Q</span>
          </div>
          <div className="ml-2 w-11/12">
            <div className="flex justify-between">
              {question.answer_count > 0 ? (
                <span className="text-red">답변 완료</span>
              ) : (
                <span>답변 대기</span>
              )}
              <div
                className="text-sm text-gray-darkest"
                onClick={(e) => e.stopPropagation()}
              >
                <span>수정</span>
                <span
                  className=" pl-3"
                  onClick={() => alert("정말 삭제하시겠습니까?")}
                >
                  삭제
                </span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span>{question.question_type}null</span>
              <span className="text-gray">
                No.{question.created_at.slice(21, 26)}
              </span>
            </div>
            <h2 className="text-base truncate mb-1">{question.title}</h2>
            <p className="text-sm text-gray line-clamp-2 mb-1">
              {question.content}
            </p>
            <div className="flex justify-between text-xs">
              <div className="">
                <span className="text-gray-light mr-1">
                  {timeForToday(question.created_at)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-10 bg-gray-darkest rounded-b-lg"></div>
      </div>
    </>
  );
};

export default Question;
