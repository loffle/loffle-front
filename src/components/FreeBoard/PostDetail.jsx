import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../API';
//
import PostDetailContent from './PostDetailContent';
import PostDetailUpdate from './PostDetailUpdate';

const PostDetail = (props) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  //수정 토글 버튼
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const handleUpdate = (e) => {
    setIsUpdateOn(!isUpdateOn);
  };

  useEffect(() => {
    function fetchData() {
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
        .then((result) => setPost(result))
        .catch((error) => console.log(error));

      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
