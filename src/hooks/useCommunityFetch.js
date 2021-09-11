import { useEffect, useState } from "react";
//
import API from "../API";

export const useCommunityFetch = (category) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  //총 데이터를 postsPerPage 만큼 등분해서 보여줍니다.
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  async function fetchData(orderType = "", searchTerm = "") {
    try {
      setLoading(true);
      const response = await API.fetchCommunity(
        category,
        orderType,
        searchTerm
      );
      //console.log(response.results);
      setPosts(response.results);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]); //order가 바뀐 것을 감지하면 fetch 다시해주기

  useEffect(() => {
    fetchData("", `?search=${searchTerm}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return {
    posts,
    loading,
    postsPerPage,
    currentPage,
    setCurrentPage,
    setOrder,
    setSearchTerm,
  };
};
