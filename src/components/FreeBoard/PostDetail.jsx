import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../API';
//
import Loading from '../Loading';
import PostDetailContent from './PostDetailContent';
import PostDetailUpdate from './PostDetailUpdate';

const PostDetail = (props) => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);

  //수정 토글 버튼
  const [isUpdateOn, setIsUpdateOn] = useState(false);
  const handleUpdate = (e) => {
    setIsUpdateOn(!isUpdateOn);
  };

  useEffect(() => {
    function fetchData() {
      setLoading(true);

      API.getPost('posts', postId)
        .then((response) => response.json())
        .then((result) => setPost(result))
        .catch((error) => console.log('error', error));

      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
