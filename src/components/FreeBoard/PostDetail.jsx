import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//
//
import Loading from "../Loading";
import PostDetailContent from "./PostDetailContent";
import PostDetailUpdate from "./PostDetailUpdate";

const PostDetail = (props) => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";

  //수정 토글 버튼
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const handleUpdate = (e) => {
    setIsUpdateOn(!isUpdateOn);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const post = await (
        await fetch(`${PROXY}/community/post/${postId}.json`, {
          headers: { Authorization: `Token ${localStorage.access_token}` },
          //header에 token을 실어 보내야 like_or_not 확인이 가능하다
        })
      ).json();
      setPost(post);

      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <>
      {loading && <Loading />}
      {loading || isUpdateOn ? (
        <PostDetailUpdate
          postId={postId}
          post={post}
          handleUpdate={handleUpdate}
        />
      ) : (
        <PostDetailContent
          loading={loading}
          postId={postId}
          post={post}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default PostDetail;
