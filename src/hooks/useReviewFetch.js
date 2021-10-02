import axios from "axios";
import { useEffect, useState } from "react";

export const useReviewFetch = (category, pageNumber, order, searchTerm) => {
  const [posts, setPosts] = useState([]);
  const [firstLoading, setFirstLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postsPerPage] = useState(5);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars
  const [hasMore, setHasMore] = useState(false); //리스트의 끝까지 가면 더이상 요청하지 않아야 함
  const [searchToggle, setSearchToggle] = useState(false);

  async function fetchData(orderType = "", searchTerm = "") {
    if (posts.length === 0) {
      console.log("hi");
      setFirstLoading(true);
    }
    setLoading(true);
    setError(false);
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    let cancel;

    const myHeaders = localStorage.access_token
      ? { Authorization: `Token ${localStorage.access_token}` }
      : {}; //토큰이 있으면 넣어주고 없으면 안넣음

    axios({
      method: "GET",
      url: `${PROXY}/community/${category}.json`,
      headers: myHeaders,
      params: { ordering: orderType, search: searchTerm, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)), //취소 토큰(cancel token)을 사용하여 요청을 취소 할 수 있습니다.
    })
      .then((response) => {
        // setPosts((prevPosts) => {
        //   //추가로 새로 불러온 res의 book을 추가한다
        //   return [...prevPosts, ...response.data.results];
        // });

        setPosts((prevPosts) => {
          //전에 있는 book들에 추가로 새로 불러온 res의 book을 추가한다
          //Set을 사용하면 중복된 결과를 거를 수 있다
          return [...new Set([...prevPosts, ...response.data.results])];
        });

        setHasMore(response.data.next); //다음페이지가 없다면 hasMore = false
        setFirstLoading(false);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel(); //cleanup 함수, unmount 될때 작동
  }

  useEffect(() => {
    if (order) {
      setPosts([]);
      switch (order) {
        case "최신순":
          fetchData();
          break;
        case "과거순":
          fetchData("created_at");
          break;
        default:
      }
    } else if (searchTerm && pageNumber > 1) {
      //조건이 더 많을 수록 더 위에 작성해서 걸러준다 - 10/3
      //검색한 결과가 2페이지를 넘어갈떄
      fetchData("", searchTerm);
    } else if (searchTerm) {
      console.log("그냥 여기로 가진다고?");
      setSearchToggle(true);
      setPosts([]);
      fetchData("", searchTerm);
    } else {
      if (searchToggle) setPosts([]); //searchTerm이 ""으로 돌아갈때 검색창을 켠적이 있으면 posts리스트 초기화
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, order, searchTerm]);

  return {
    posts,
    firstLoading,
    loading,
    postsPerPage,
    hasMore,
  };
};
