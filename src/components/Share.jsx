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

const Share = ({ handleShareModal, id = "" }) => {
  const currentUrl = window.location.href + id;
  //tempURL을 만들고 맨 뒷자리가 숫자면 그냥 사용 숫자가 아니면 게시물 id프롭스 활용

  return (
    <div
      className="max-w-480 mx-auto flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-modal z-50"
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
          className="w-12 h-12 text-white rounded-full border-0 font-bold text-lg cursor-pointer bg-primary"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert("링크가 복사되었습니다.");
            }}
          >
            URL
          </button>
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
