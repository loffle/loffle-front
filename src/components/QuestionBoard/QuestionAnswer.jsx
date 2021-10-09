import React, { useRef } from 'react';
import { timeForToday } from '../helpers';
//
import Comment from '../FreeBoard/Comment/Comment';
import ModalComentCreate from '../ModalComentCreate';
//
import back from '../../images/back.svg';
import profile from '../../images/profile.svg';

const QuestionAnswer = ({
  question,
  answers,
  setAnswers,
  handleAnswerModal,
}) => {
  const scrollBox = useRef(null);

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollBox.current;

    scrollBox.current.scrollTop = scrollHeight - clientHeight;
  };

  return (
    <>
      <div
        className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-20"
        onClick={handleAnswerModal}
      >
        <div
          className="absolute bottom-0 px-5 py-4 w-full rounded-t-xl bg-white"
          onClick={(e) => e.stopPropagation()}
          style={{ height: '92%' }}
          ref={scrollBox}
        >
          <header className="flex justify-between">
            <img src={back} alt="back-button" onClick={handleAnswerModal} />
            <h1 className="text-lg font-bold">답변</h1>
            <div></div>
          </header>

          <h1 className="text-2xl mt-8">Q : </h1>
          <article className="mt-4 pb-4 border-b border-gray-border">
            <div className="flex items-start">
              <img src={profile} alt="profile" className="w-8" />
              <div className="ml-2">
                <h3 className="text-sm font-bold">{question.user}</h3>
                <p className="text-base mt-2">{question.title}</p>
                <div className="text-xs text-gray-light mt-1">
                  <span>{timeForToday(question.created_at)}</span>
                </div>
              </div>
            </div>
          </article>

          {answers.length !== 0 ? (
            <h1 className="text-2xl mt-6">A : </h1>
          ) : (
            <h1 className="text-l mt-6 w-full text-center text-gray">
              답변이 아직 등록되지않았습니다.
            </h1>
          )}
          {/* 답변 */}
          {answers &&
            answers.map((answer) => (
              <Comment
                category={'questions'}
                key={answer.id}
                comment={answer}
                comments={answers}
                setComments={setAnswers}
                postId={question.id}
              />
            ))}
        </div>
      </div>

      {/* 답변 작성 - sticky 충돌나서 fixed로 수정*/}
      <ModalComentCreate
        category={'questions'}
        postId={question.id}
        comments={answers}
        setComments={setAnswers}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
};

export default QuestionAnswer;
