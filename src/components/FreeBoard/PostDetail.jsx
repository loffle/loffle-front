/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API';
import { usePostState } from '../../store/posts';
//
import PostDetailContent from './PostDetailContent';
import PostDetailUpdate from './PostDetailUpdate';

const PostDetail = (props) => {
  const postState = usePostState();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(postState.find((obj) => obj.id === +postId));

  //수정 토글 버튼
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const handleUpdate = (e) => {
    setIsUpdateOn(!isUpdateOn);
  };

  useEffect(() => {
    if (!post) {
      setLoading(true);
      API.getPost('posts', postId)
        .then((response) => {
          if (response.ok) return response.json();
          if (response.status === 404) {
            navigate('/error');
          }
          return response.text().then((text) => {
            throw new Error(text);
          });
        })
        .then((result) => {
          setPost(result);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {isUpdateOn ? (
        <PostDetailUpdate
          postId={postId}
          post={post}
          handleUpdate={handleUpdate}
        />
      ) : (
        loading || (
          <PostDetailContent
            loading={loading}
            postId={postId}
            post={post}
            handleUpdate={handleUpdate}
          />
        )
      )}
    </>
  );
};

export default PostDetail;
