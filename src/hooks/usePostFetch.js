import React, { useEffect, useState } from "react";
import axios from "axios";

export const usePostFetch = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  //총 데이터를 postsPerPage 만큼 등분해서 보여줍니다.

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { posts, loading, postsPerPage, currentPage, setCurrentPage };
};
