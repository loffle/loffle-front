import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROXY } from '../config';

const Drawer = ({ logo, handleDrawerModal }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    var requestOptions = {
      method: 'GET',
      headers: { Authorization: `Token ${localStorage.access_token}` },
    };

    fetch(`${PROXY}/logout`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        localStorage.removeItem('access_token'); //localStorage token 제거
        localStorage.removeItem('access_nickname'); //localStorage token 제거
        localStorage.removeItem('access_id');
        alert(result.detail);
        window.location.reload();
      })
      .catch((error) => console.log('error', error));

    navigate('/');
  };

  return (
    <>
      <div
        className="max-w-480 mx-auto h-screen flex items-center justify-center fixed inset-0 bg-modal z-50"
        onClick={handleDrawerModal}
      >
        <div
          className="absolute top-0 px-5 py-4 w-full h-11/12 rounded-b-xl bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          <ul
            onClick={handleDrawerModal}
            //   ^^^ 추후 수정 요망
            className="flex flex-col justify-center text-l xs:text-xl font-bold py-7 xs:py-10 text-center"
          >
            <Link to="/">
              <li className="py-4 xs:py-5">소개</li>
            </Link>
            <Link to="/raffles">
              <li className="py-4 xs:py-5">응모하기</li>
            </Link>
            <Link to="/community/posts">
              <li className="py-4 xs:py-5">자유게시판</li>
            </Link>
            <Link to="/community/reviews">
              <li className="py-4 xs:py-5">당첨 후기 게시판</li>
            </Link>
            <Link to="/community/notices">
              <li className="py-4 xs:py-5">공지사항</li>
            </Link>
            <Link to="/community/questions">
              <li className="py-4 xs:py-5">QnA</li>
            </Link>
            {localStorage.access_token ? ( //localStorage token ?
              <li
                onClick={handleLogout}
                className="flex justify-center py-4 xs:py-5"
              >
                {localStorage.access_nickname}님 | 로그아웃
              </li>
            ) : (
              <Link className="py-4 xs:py-5" to="/login">
                <li>로그인 | 회원가입</li>
              </Link>
            )}
            <img className="h-6 mt-4 xs:mt-5" src={logo} alt="logo" />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Drawer;
