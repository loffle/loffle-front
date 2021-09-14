import React, { useEffect, useState } from "react";
//
import { timeForToday } from "../helpers";
//
import arrowDown from "../../images/arrow_down.svg";
import arrowUp from "../../images/arrow_up.svg";

const Notice = ({ notice, lastNoticeElementRef }) => {
  const [isContentShow, setIsContentShow] = useState(false);
  const handleContentShow = (e) => {
    setIsContentShow(!isContentShow);
  };

  return (
    <>
      <div
        className="h-30 p-5 border-b border-gray-border"
        ref={lastNoticeElementRef}
        onClick={() => handleContentShow()}
      >
        <div className="flex justify-between">
          <div className="text-sm">
            <span className="font-bold">{notice.title}</span>
            <span className="text-gray-light mr-1">
              {timeForToday(notice.created_at)}
            </span>
          </div>
          <img src="" alt="" />
        </div>
      </div>
    </>
  );
};

export default Notice;
