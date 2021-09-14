import React, { useState } from "react";
//
import { timeWithHyphen } from "../helpers";
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
        className="h-30 px-5 py-3 border-b border-gray-border"
        ref={lastNoticeElementRef}
        onClick={() => handleContentShow()}
      >
        <div className="flex justify-between">
          <div className="text-sm">
            <div className="font-bold mb-1">{notice.title}</div>
            <div className="text-gray-light">
              {timeWithHyphen(notice.created_at)}
            </div>
          </div>
          <img src={isContentShow ? arrowUp : arrowDown} alt="content-toggle" />
        </div>
        {isContentShow && (
          <div className="border-t border-gray-dark mt-3 py-3 text-sm">
            {notice.content}
          </div>
        )}
      </div>
    </>
  );
};

export default Notice;
