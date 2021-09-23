import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//
import { Context } from "../context";
//
//
import axios from "axios";

const Drawer = ({ logo, handleDrawerModal }) => {
  const [user, setUser] = useContext(Context); //user만 사용하고 setUser 사용 안함
  const navigate = useNavigate();
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  const handleLogout = () => {
    try {
      axios
        .get(`${PROXY}/api-auth/logout/`)
        .then(() => {
          setUser(null);
          localStorage.removeItem("access_token"); //localStorage token 제거
          //localStorage.removeItem("access_nickname"); //localStorage token 제거
          console.log(user);
          alert("로그아웃 되었습니다.");
        })
        .catch();
    } catch (error) {
      console.log(error);
    }
    navigate("/");
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
            className="flex flex-col justify-center text-xl font-bold gap-14 py-10 text-center"
          >
            <li>소개</li>
            <li>응모하기</li>
            <Link to="/community/post">
              <li>자유게시판</li>
            </Link>
            <Link to="/community/review">
              <li>당첨 후기 게시판</li>
            </Link>
            <Link to="/community/notice">
              <li>공지사항</li>
            </Link>
            <Link to="/community/question">
              <li>QnA</li>
            </Link>
            {localStorage.access_token ? ( //localStorage token ?
              <li onClick={handleLogout} className="flex justify-center">
                {/* <img src={profile} alt="my-page-button" className="w-8" /> */}
                {/* {user.username}님 | 로그아웃 */}
                {localStorage.access_token}님 | 로그아웃
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
    </>
  );
};

export default Drawer;
