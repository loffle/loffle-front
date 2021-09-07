import React, { useEffect, useState } from "react";
import axios from "axios";

export const useReviewFetch = (props) => {
  const [reviews, setreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setreviewsPerPage] = useState(1);
  //총 데이터를 reviewsPerPage 만큼 등분해서 보여줍니다.

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setreviews(response.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return { reviews, loading, reviewsPerPage, currentPage, setCurrentPage };
};
