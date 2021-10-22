import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROXY } from '../config';

export const useFreeBoardFetch = (category, pageNumber, order, searchTerm) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  async function fetchData(orderType = '', searchTerm = '') {
    setLoading(true);

    axios({
      method: 'GET',
      url: `${PROXY}/${category}.json`,
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
    switch (order) {
      case '과거순':
        fetchData('created_at', searchTerm);
        break;
      default:
        fetchData('', searchTerm);
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, pageNumber, searchTerm]);

  return {
    posts,
    loading,
    postsPerPage,
    totalPosts,
  };
};
