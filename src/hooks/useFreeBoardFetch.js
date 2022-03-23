import axios from 'axios';
import { useEffect, useState } from 'react';
import { PROXY } from '../config';

export const useFreeBoardFetch = (category, pageNumber, order, searchTerm) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage] = useState(5);
  const [totalPosts, setTotalPosts] = useState(0);

  async function fetchData(orderType = '', searchTerm = '') {
    setLoading(true);

    axios({
      method: 'GET',
      url: `${PROXY}/${category}`,
      params: { ordering: orderType, search: searchTerm, page: pageNumber },
    })
      .then((response) => {
        if (response.status === 200) {
          return response;
        }
      })
      .then(({ data: { results, count } }) => {
        setPosts(results);
        setTotalPosts(count);
        setLoading(false);
      })
      .catch(() => {
        alert('게시물을 불러오는 것을 실패했습니다 😵');
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
