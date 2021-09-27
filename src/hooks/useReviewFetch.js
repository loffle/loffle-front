import axios from "axios";
import { useEffect, useState } from "react";

export const useReviewFetch = (category, pageNumber, order, searchTerm) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage] = useState(5);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [hasMore, setHasMore] = useState(false); //리스트의 끝까지 가면 더이상 요청하지 않아야 함

  useEffect(() => {
    setPosts([]);
    //fetchData("", searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    async function fetchData(orderType = "", searchTerm = "") {
      setLoading(true);
      setError(false);
      const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
      let cancel;
      axios({
        method: "GET",
        url: `${PROXY}/community/${category}.json`,
        params: { ordering: orderType, search: searchTerm, page: pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)), //취소 토큰(cancel token)을 사용하여 요청을 취소 할 수 있습니다.
      })
        .then((response) => {
          setPosts((prevPosts) => {
            //추가로 새로 불러온 res의 book을 추가한다
            //Set을 사용하면 중복된 결과를 거를 수 있다
            //return [...new Set([...prevPosts, ...response.data.results])];
            return [...prevPosts, ...response.data.results];
          });
          setHasMore(response.data.next); //다음페이지가 없다면 hasMore = false
          setLoading(false);
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

  useEffect(() => {
    setPosts([]);
    switch (order) {
      case "최신순":
        //fetchData();
        break;
      case "과거순":
        //fetchData("created_at");
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]); //order가 바뀐 것을 감지하면 fetch 다시해주기

  return {
    posts,
    loading,
    postsPerPage,
    hasMore,
  };
};
