import axios from "axios";
import { useEffect, useState } from "react";

export const useCommunityFetch = (category, pageNumber, order, searchTerm) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  async function fetchData(orderType = "", searchTerm = "") {
    setLoading(true);
    const PROXY = window.location.hostname === "localhost" ? "" : "/proxy";
    axios({
      method: "GET",
      url: `${PROXY}/community/${category}.json`,
      params: { ordering: orderType, search: searchTerm, page: pageNumber },
    })
      .then((response) => {
        setPosts(response.data.results);
        setTotalPosts(response.data.count);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
      });
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    switch (order) {
      case "최신순":
        fetchData();
        break;
      case "과거순":
        fetchData("created_at");
        break;
      default:
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]); //order가 바뀐 것을 감지하면 fetch 다시해주기

  useEffect(() => {
    fetchData("", searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return {
    posts,
    loading,
    postsPerPage,
    totalPosts,
  };
};
