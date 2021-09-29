import axios from "axios";
import { useEffect, useState } from "react";

export const useCommentFetch = (category, pageNumber, postId) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [hasMore, setHasMore] = useState(false); //리스트의 끝까지 가면 더이상 요청하지 않아야 함

  useEffect(() => {
    async function fetchData() {
      setCommentLoading(true);
      setError(false);
      const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
      let cancel;
      axios({
        method: "GET",
        url: `${PROXY}/community/${category}/${postId}/comment.json`,
        params: { page: pageNumber },
      })
        .then((response) => {
          setComments((prevComments) => {
            //추가로 새로 불러온 res의 book을 추가한다
            //Set을 사용하면 중복된 결과를 거를 수 있다
            //return [...new Set([...prevComments, ...response.data.results])];
            return [...prevComments, ...response.data.results];
          });
          setCommentCount(response.data.count);
          setHasMore(response.data.next); //다음페이지가 없다면 hasMore = false
          setCommentLoading(false);
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
      return () => cancel(); //cleanup 함수, unmount 될때 작동
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return {
    comments,
    setComments,
    commentCount,
    commentLoading,
    hasMore,
  };
};
