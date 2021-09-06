import React from "react";
import { Link } from "react-router-dom";

const Drawer = ({ logo, handleDrawerModal }) => {
  return (
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
          className="flex flex-col justify-center text-xl font-bold gap-14 py-10 text-center"
        >
          <li>소개</li>
          <li>응모하기</li>
          <Link to="/community/post/">
            <li>자유게시판</li>
          </Link>
          <li>당첨후기</li>
          <li>공지사항</li>
          <li>QnA</li>
          <li>로그인 | 회원가입</li>
          <img className="h-6" src={logo} alt="logo" />
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
