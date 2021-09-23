import React from "react";
import { useState } from "react";
import { useRef } from "react";
import cookie from "react-cookies";
//
import pencil from "../../../images/pencil.svg";

const CommentCreate = ({ postId }) => {
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  const [inputs, setInputs] = useState({
    content: "",
  });
  const titleInput = useRef();

  const { content } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  };

  const handleCreate = () => {
    if (!content) {
      //댓글이 없으면 그냥 return
      alert("댓글을 입력해주세요.");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Token ${localStorage.access_token}`);
    myHeaders.append("Cookie", `${cookie.load("sessionid")}`);

    var formdata = new FormData();
    formdata.append("content", content);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(`${PROXY}/community/post/${postId}/comment`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        window.location.reload(); //댓글 작성시 새로고침
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="sticky bottom-3 flex items-center justify-between mx-3">
      <div className="flex justify-between px-3 py-1 w-10/12 h-14 bg-white rounded-2xl shadow-lg">
        <textarea
          className="w-full outline-none resize-none mt-4"
          name="content"
          value={content}
          onChange={onChange}
          maxLength="300"
          placeholder="댓글을 입력하세요."
          autoComplete="false"
        />
      </div>
      <div
        className="flex items-center justify-center h-12 w-12 min-w-min ml-2 mt-1 bg-primary opacity-90 rounded-full shadow-xl"
        onClick={handleCreate}
      >
        <img className="w-5 h-5" src={pencil} alt="write-comment-button" />
      </div>
    </div>
  );
};

export default CommentCreate;
