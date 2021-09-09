import { useEffect, useState } from "react";
//
import API from "../API";

export const useCommunityFetch = (category) => {
  const [order, setOrder] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  //총 데이터를 postsPerPage 만큼 등분해서 보여줍니다.
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  async function fetchData(orderType = "") {
    try {
      setLoading(true);
      const response = await API.fetchCommunity(category, orderType);
      setPosts(response.results);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    switch (order) {
      case "최신순":
        fetchData();
        break;
      case "과거순":
        fetchData("/?ordering=created_at");
        break;
      default:
    }
  }, [order]);

  return {
    posts,
    loading,
    postsPerPage,
    currentPage,
    setCurrentPage,
    setOrder,
  };
};
