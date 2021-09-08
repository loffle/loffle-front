import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
//
import { Context } from "../context";
//
import profile from "../images/profile.svg";

const Drawer = ({ logo, handleDrawerModal }) => {
  const [user] = useContext(Context); //user만 사용하고 setUser 사용 안함

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
          <Link to="/community/review/">
            <li>당첨 후기 게시판</li>
          </Link>
          <li>공지사항</li>
          <li>QnA</li>
          {user ? (
            <li className="flex justify-center">
              <img src={profile} alt="my-page-button" className="w-8" />
            </li>
          ) : (
            <Link to="/login">
              <li>로그인 | 회원가입</li>
            </Link>
          )}
          <img className="h-6" src={logo} alt="logo" />
        </ul>
      </div>
    </div>
  );
};

export default Drawer;