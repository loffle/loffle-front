import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import search from '../images/search_btn.svg';

const Search = ({
  setPageNumber,
  handleSearchModal,
  setSearchTerm,
  lastSearchTerm,
  setLastSearchTerm,
}) => {
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setPageNumber(1);
      setSearchTerm(lastSearchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSearchTerm, lastSearchTerm]);

  return (
    <div
      className="max-w-480 mx-auto fixed top-0 left-0 right-0 bottom-0 bg-modal bg-opacity-80 z-50 px-1 py-1"
      onClick={handleSearchModal}
    >
      <div
        className="flex items-center w-full mt-14 px-5 py-2 h-14 rounded-lg shadow-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <img className="w-5" src={search} alt="search-button" />

        <input
          className="w-full h-full ml-5 outline-none"
          placeholder="검색어를 입력하세요."
          value={lastSearchTerm}
          onChange={(event) => {
            setLastSearchTerm(event.currentTarget.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default Search;
