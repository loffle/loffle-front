import React from "react";
import search from "../images/search_btn.svg";

const Search = ({ handleSearchModal }) => {
  return (
    <div
      className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-50"
      onClick={handleSearchModal}
    >
      <div
        className="flex items-center px-5 py-4 w-10/12 h-16 rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="w-8 h-16" src={search} alt="search-button" />

        <input
          className="w-full h-full ml-5 outline-none"
          placeholder="검색어를 입력하세요."
        ></input>
      </div>
    </div>
  );
};

export default Search;
