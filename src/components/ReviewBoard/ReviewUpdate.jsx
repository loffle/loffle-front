import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../API';
//
import attachment from '../../images/attachment.svg';
import pencil from '../../images/pencil.svg';
//
import back from '../../images/back.svg';

const ReviewUpdate = ({ reviewId, review, handleUpdate }) => {
  const navigate = useNavigate(); //Naviagte hook 사용

  // eslint-disable-next-line no-unused-vars
  const attachmentInput = useRef();

  const [inputs, setInputs] = useState({
    title: review.title, //기존 값을 불러옴
    content: review.content, //기존 값을 불러옴
  });
  const titleInput = useRef();

  const { title, content } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const handlePut = () => {
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`); //localStorage token load

    var formdata = new FormData();
    formdata.append('title', title);
    formdata.append('content', content);

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    API.putPost('reviews', reviewId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate(`/community/reviews/${reviewId}`);
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <>
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
            <h1 className="text-lg font-bold">당첨 후기 수정</h1>
            <div></div>
          </header>

          {/* form */}
          <form className="m-1 border-2 border-gray-border shadow-lg rounded-lg">
            {/* title */}
            <p className="p-4 border-b border-gray-border">
              <input
                className="w-full h-5 text-gray-darkest text-base font-bold outline-none"
                name="title"
                value={title}
                onChange={onChange}
                ref={titleInput}
                placeholder="글 제목"
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
                //ref={attachmentInput}
                type="file"
                accept="image/jpg,impge/png,image/jpeg,image/gif"
                className="hidden"
                name="file"
                //onChange={onChange}
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  //attachmentInput.current.click();
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
                    alt="write-review-button"
                  />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewUpdate;
