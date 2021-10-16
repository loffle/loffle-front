import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
//
import pencil from '../images/pencil.svg';

const ModalComentCreate = ({
  category,
  postId,
  comments,
  setComments,
  scrollToBottom,
  hasMore,
}) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    content: '',
  });

  const { content } = inputs;

  const onClick = () => {
    if (!localStorage.access_token) {
      if (window.confirm('로그인 화면으로 이동할까요?✨')) {
        navigate('/login');
      }
    }
  };

  const onChange = (e) => {
    if (!localStorage.access_token) return; //권한
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const handleCreate = () => {
    if (!localStorage.access_token) return; //권한
    if (!content) {
      //댓글이 없으면 그냥 return
      alert('댓글을 입력해주세요.');
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Token ${localStorage.access_token}`);

    var formdata = new FormData();
    if (category === 'questions') {
      formdata.append('title', content);
    }
    formdata.append('content', content);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    API.postComment(category, postId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setComments(comments.concat(result)); //새로운 댓글 setState
        hasMore ? alert('댓글이 하단에 추가되었습니다.') : scrollToBottom();
        //댓글이 전부 로딩되지 않았으면 alert, 맨아래면 댓글 바로 확인 가능
        setInputs({
          content: '',
        });
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <div className="max-w-480 fixed bottom-4 w-full flex items-center justify-between px-6 z-50">
      <div className="flex justify-between px-3 py-1 w-10/12 h-14 bg-white rounded-2xl shadow-lg">
        <input
          className="w-full outline-none"
          name="content"
          value={content}
          onChange={onChange}
          onClick={onClick}
          maxLength="300"
          placeholder={
            localStorage.access_token //권한
              ? '댓글을 입력하세요.'
              : '로그인 후 댓글을 작성해주세요.'
          }
          autoComplete="off"
        />
      </div>
      <div
        className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl"
        onClick={handleCreate}
      >
        <img className="w-5 h-5" src={pencil} alt="write-comment-button" />
      </div>
    </div>
  );
};

export default ModalComentCreate;
