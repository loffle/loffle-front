import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PROXY } from '../../config';
//
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
    async function fetchData() {
      setLoading(true);

      var myHeaders = new Headers();
      if (localStorage.access_token) {
        //토큰이 있을때만 header 첨부
        myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
      }

      const post = await (
        await fetch(`${PROXY}/community/posts/${postId}.json`, {
          method: 'GET',
          headers: myHeaders,
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
