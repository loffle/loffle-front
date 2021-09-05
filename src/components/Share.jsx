import React from "react";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Share = ({ handleShareModal }) => {
  const currentUrl = window.location.href;

  return (
    <div
      className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-50"
      onClick={handleShareModal}
    >
      {/* 345*185 */}
      <div
        className="flex items-center justify-center gap-2 px-5 py-4 w-10/12 h-16 rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 링크 버튼 */}
        <CopyToClipboard
          text={currentUrl}
          className="w-12 h-12 text-white rounded-full border-0 font-bold text-lg cursor-pointer bg-primary "
        >
          <button>URL</button>
        </CopyToClipboard>
        {/* 이메일 버튼 */}
        <EmailShareButton url={currentUrl}>
          <EmailIcon size={48} round={true} borderRadius={24}></EmailIcon>
        </EmailShareButton>
        {/* 페이스북 버튼 */}
        <FacebookShareButton url={currentUrl}>
          <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        {/* 트위터 버튼 */}
        <TwitterShareButton url={currentUrl}>
          <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        {/* 라인 버튼 */}
        <LineShareButton url={currentUrl}>
          <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
        </LineShareButton>
      </div>
    </div>
  );
};

export default Share;
