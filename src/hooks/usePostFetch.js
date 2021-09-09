import React, { useEffect, useState } from "react";
import axios from "axios";

export const usePostFetch = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  //총 데이터를 postsPerPage 만큼 등분해서 보여줍니다.
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await axios.get("/community/post.json");
        console.log(response.data.results);

        //띄워주는거 일단 성공,

        setPosts(response.data.results);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return { posts, loading, postsPerPage, currentPage, setCurrentPage };
};
