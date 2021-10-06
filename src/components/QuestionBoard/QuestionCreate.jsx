/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PROXY } from '../../config';
//
import attachment from '../../images/attachment.svg';
import pencil from '../../images/pencil.svg';

const QuestionCreate = (props) => {
  window.scrollTo(0, 0);
  const navigate = useNavigate(); //Naviagte hook 사용

  const attachmentInput = useRef();

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    questionType: '',
  });
  const titleInput = useRef();

  const { title, content, questionType } = inputs;

  const onChange = (e) => {
    //   //e.preventDefault();
    //   let reader = new FileReader();
    //   let file = e.target.files[0];
    //   reader.onloadend = () => {
    //     setFileUrl({
    //       file: file,
    //       /questionURL: reader.result,
    //     });
    //   };
    //   reader.readAsDataURL(file);
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const [questionTypes, setQuestionTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    if (!content) {
      alert('내용을 입력해주세요');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`); //localStorage token load

    const question_type = questionTypes.filter(
      (type) => type.name === questionType
    ); //name -> id 변환 작업

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);
    formdata.append('question_type', question_type[0].id);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${PROXY}/community/question`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate(`/community/question`);
      })
      .catch((error) => console.log('error', error));
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${PROXY}/community/questiontype`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((result) => {
        setQuestionTypes(result);
        setLoading(false);
      })
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <>
      <div className="min-h-screen">
        {/* header */}
        <div className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold"> QnA &gt; 글 작성</h1>
          <Link to={{ pathname: '/community/question' }}>
            <span className="text-gray h-5 ml-5 bg-white">뒤로가기</span>
          </Link>
        </div>

        {/* form */}
        <form className="p-1">
          <select
            name="questionType"
            defaultValue="default"
            onChange={onChange}
            className="text-gray w-full h-12 p-2 bg-white border-2 border-gray-border rounded-lg outline-none"
          >
            <option value="default" disabled>
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
                  handleCreate();
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
    </>
  );
};

export default QuestionCreate;
