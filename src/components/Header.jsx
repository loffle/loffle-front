import React from "react";
import searchIcon from "../images/search_btn.svg";
import menuBtn from "../images/menu_btn.svg";

const Header = (props) => (
  <header className="shadow-md w-full h-12 sticky top-0 l-0 r-0 z-50 bg-white px-5">
    <div className="h-full flex items-center justify-between">
      <h1 className="text-xl font-bold">자유게시판</h1>
      <div className="flex">
        <img className="w-5 h-5" src={searchIcon} alt="search-icon" />
        <img className="w-5 h-5 ml-6" src={menuBtn} alt="search-icon" />
      </div>
    </div>
  </header>
);

export default Header;
