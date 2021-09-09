import { useEffect, useState } from "react";
import axios from "axios";
//
import API from "../API";

export const usePostFetch = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  //총 데이터를 postsPerPage 만큼 등분해서 보여줍니다.
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  async function fetchData() {
    try {
      setLoading(true);
      //const response = await axios.get("/community/post.json");
      const response = await API.fetchPost();

      console.log(response);

      //띄워주는거 일단 성공,

      setPosts(response.results);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { posts, loading, postsPerPage, currentPage, setCurrentPage };
};
