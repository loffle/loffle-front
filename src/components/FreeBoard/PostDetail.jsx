import React from "react";
//
import { useParams } from "react-router-dom";

const PostDetail = (props) => {
  const { postId } = useParams();

  return <h1>{postId}</h1>;
};

export default PostDetail;
