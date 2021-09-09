import React, { useState } from "react";

import Loading from "../Loading";
import Post from "./Post";

import search from "../../images/search_btn.svg";
import Search from "../Search";
import { useEffect } from "react";

const FreeBoardLists = ({ posts, loading }) => {
  const [isSearchModalOn, setIsSearchModalOn] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSearchModal = (e) => {
    setIsSearchModalOn(!isSearchModalOn);
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
    console.log(e.target);
  };

  useEffect(() => {
    //console.log(selected);
  }, [selected]);

  return (
    <>
      {loading && <Loading />}
      {isSearchModalOn && (
        <Search icon={search} handleSearchModal={handleSearchModal} />
      )}
      <div className="max-w-480 min-h-screen">
        <div className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold">자유게시판</h1>
          <div className="flex items-center">
            <button onClick={() => handleSearchModal()}>
              <img className="w-4 h-4" src={search} alt="search-button" />
            </button>
            <select
              onChange={handleSelect}
              className="text-gray h-5 ml-5 bg-white"
            >
              <option>최신순 </option>
              <option>조회순 </option>
              <option>추천순 </option>
              <option>답변순 </option>
            </select>
          </div>
        </div>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default FreeBoardLists;
