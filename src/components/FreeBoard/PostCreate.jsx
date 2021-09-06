import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
//
import attachment from "../../images/attachment.svg";
import pencil from "../../images/pencil.svg";

const PostCreate = (props) => {
  const [logoLoading, setLogoLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState({ file: "", previewURL: "" });

  const attachmentInput = useRef();

  const onChange = (e) => {
    //e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFileUrl({
        file: file,
        previewURL: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="min-h-screen">
        {/* header */}
        <div className="flex items-center justify-between mb-1 p-5 h-14 border-b border-gray-border">
          <h1 className="text-xl font-bold">자유게시판 > 글 작성</h1>
          <Link to={{ pathname: "/community/post" }}>
            <span className="text-gray h-5 ml-5 bg-white">뒤로가기</span>
          </Link>
        </div>

        {/* form */}
        <form className="m-1 border-2 border-gray-border shadow-lg rounded-lg">
          {/* title */}
          <p className="p-4 border-b border-gray-border">
            <input
              className="w-full h-5 text-gray-darkest text-base font-bold outline-none"
              name="title"
              placeholder="글 제목"
            />
          </p>
          {/* desc */}
          <p className="p-4 border-b border-gray-border">
            <textarea
              className="h-44 w-full text-base outline-none resize-none"
              name="text"
              placeholder="글 내용을 작성해주세요."
            ></textarea>
          </p>
          {/* option */}
          <div className="flex justify-between items-center bg-gray-border bg-opacity-20">
            {/* attachment */}
            <input
              ref={attachmentInput}
              type="file"
              accept="image/jpg,impge/png,image/jpeg,image/gif"
              className="hidden"
              name="file"
              onChange={onChange}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                attachmentInput.current.click();
              }}
            >
              <img
                className="w-5 h-5 m-3 hover:opacity-80"
                src={attachment}
                alt=""
              />
            </button>
            <div className="flex items-center justify-center w-12 h-12 bg-primary opacity-90 rounded-br-lg hover:bg-opacity-80 cursor-pointer">
              <img className="w-5 h-5" src={pencil} alt="write-post-button" />
            </div>
          </div>
        </form>
      </div>
      {/* {fileUrl ?? <img src={fileUrl.previewURL} alt="test"></img>} */}
    </>
  );
};

export default PostCreate;
