import React, { useState, useRef, useEffect } from 'react';
import API from '../../API';
//
import attachment from '../../images/attachment.svg';
import pencil from '../../images/pencil.svg';
//
import back from '../../images/back.svg';
const QuestionUpdate = ({ questionId, question, handleUpdate }) => {
  // eslint-disable-next-line no-unused-vars
  const attachmentInput = useRef();

  const [inputs, setInputs] = useState({
    title: question.title, //기존 값을 불러옴
    content: question.content, //기존 값을 불러옴
    questionType: question.question_type, //기존 값을 불러옴, usEffect도 참고
  });
  const titleInput = useRef();

  const { title, content, questionType } = inputs;

  console.log(questionType);

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const [questionTypes, setQuestionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handlePut = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`); //localStorage token load

    const question_type = questionTypes.filter(
      (type) => type.name === questionType
    ); //name -> id 변환 작업

    var formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('question_type', question_type[0].id);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    API.putPost('questions', questionId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
        alert('문의 내역 수정이 완료되었습니다.');
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    setLoading(true);

    API.getQuestionTypes()
      .then((response) => response.json())
      .then((result) => {
        setQuestionTypes(result);
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, []); //빼도 됩니다.

  return (
    <div
      className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-20"
      onClick={handleUpdate}
    >
      <div
        className="absolute bottom-0 p-1 w-full rounded-t-xl bg-white"
        onClick={(e) => e.stopPropagation()}
        style={{ height: '92%' }}
      >
        <header className="flex justify-between p-3">
          <img src={back} alt="back-button" onClick={handleUpdate} />
          <h1 className="text-lg font-bold">문의 내역 수정</h1>
          <div></div>
        </header>

        {/* form */}
        <form className="p-1">
          <select
            name="questionType"
            value={questionType}
            onChange={onChange}
            className="text-gray w-full h-12 p-2 bg-white border-2 border-gray-border rounded-lg outline-none"
          >
            <option disabled selected>
              문의 유형을 선택해주세요.
            </option>
            {loading ||
              questionTypes.map((questionType) => (
                <option key={questionType.id}>{questionType.name}</option>
              ))}
          </select>

          <div className="mt-1 border-2 border-gray-border shadow-lg rounded-lg">
            {/* title */}
            <p className="p-4 border-b border-gray-border">
              <input
                className="w-full h-5 text-gray-darkest text-base font-bold outline-none"
                name="title"
                value={title}
                onChange={onChange}
                ref={titleInput}
                placeholder="글 제목을 작성해주세요."
                autoComplete="off"
              />
            </p>
            {/* desc */}
            <p className="p-4 border-b border-gray-border">
              <textarea
                className="h-44 w-full text-base outline-none resize-none"
                name="content"
                value={content}
                onChange={onChange}
                placeholder="글 내용을 작성해주세요."
              ></textarea>
            </p>
            {/* option */}
            <div className="flex justify-between items-center bg-gray-border bg-opacity-20">
              {/* attachment */}
              <input
                ref={attachmentInput}
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                className="hidden"
                name="file"
                onChange={onChange}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  attachmentInput.current.click();
                }}
              >
                <img
                  className="w-5 h-5 m-3 hover:opacity-80"
                  src={attachment}
                  alt=""
                />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handlePut();
                }}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-primary opacity-90 rounded-br-lg hover:bg-opacity-80 cursor-pointer">
                  <img
                    className="w-5 h-5"
                    src={pencil}
                    alt="write/question-button"
                  />
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionUpdate;
