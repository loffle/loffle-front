import React, { useEffect, useState } from "react";
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
  const [comments, setComments] = useState([]);
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
        await fetch(`${PROXY}/community/post/${postId}.json`)
      ).json();
      setPost(post);

      const comments = await (
        await fetch(`${PROXY}/community/post/${postId}/comment.json`)
      ).json();
      setComments(comments.results);

      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <>
      {loading && <Loading />}
      {isUpdateOn ? (
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
          comments={comments}
          handleUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default PostDetail;
