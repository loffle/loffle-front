import React, { useEffect, useState } from 'react';
import API from '../../API';
//
import { timeWithHyphen } from '../helpers';
import QuestionAnswer from './QuestionAnswer';
import QuestionUpdate from './QuestionUpdate';

const Question = ({ question, lastQuestionElementRef }) => {
  const [answers, setAnswers] = useState([]);

  //답글 모달
  const [isAnswerModalOn, setIsAnswerModalOn] = useState(false);
  const handleAnswerModal = (e) => {
    setIsAnswerModalOn(!isAnswerModalOn);
    isAnswerModalOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  //수정 토글 버튼
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const handleUpdate = (e) => {
    setIsUpdateOn(!isUpdateOn);
    isUpdateOn //모달 켜져있을 시 스크롤 방지
      ? (document.body.style.overflow = 'unset')
      : (document.body.style.overflow = 'hidden');
  };

  useEffect(() => {
    async function fetchData() {
      API.getAnswer(question.id)
        .then((response) => response.json())
        .then((result) => {
          setAnswers(result.results);
        })
        .catch((error) => console.log('error', error));
    }
    if (question) fetchData(); //reiview undefined check
  }, [question]);

  const handleDelete = () => {
    if (
      window.confirm(
        '해당 게시물을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.'
      )
    ) {
      API.deletePost('questions', question.id) //
        .then((response) => {
          alert('게시물이 삭제되었습니다.');
          window.location.reload();
        });
    }
  };

  return (
    <>
      {isUpdateOn && (
        <QuestionUpdate
          questionId={question.id}
          question={question}
          handleUpdate={handleUpdate}
        />
      )}

      {answers && question && isAnswerModalOn && (
        <QuestionAnswer
          question={question}
          answers={answers}
          setAnswers={setAnswers}
          handleAnswerModal={handleAnswerModal}
        />
      )}

      <div
        className="h-30 m-5 rounded-lg shadow-lg"
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
              {localStorage.access_nickname === question.user && (
                <div
                  className="text-sm text-gray-darkest"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={handleUpdate}>
                    <span>수정</span>
                  </button>
                  <button onClick={handleDelete}>
                    <span className="ml-3">삭제</span>
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm">
              <span>{question.question_type}</span>
              <span className="text-gray">No.{question.id}</span>
            </div>
            <h2 className="text-base truncate mb-1">{question.title}</h2>
            <p className="text-sm text-gray line-clamp-2 mb-1">
              {question.content}
            </p>
            <div className="flex justify-between text-xs">
              <div className="">
                <span className="text-gray-light mr-1">
                  {timeWithHyphen(question.created_at)}
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
