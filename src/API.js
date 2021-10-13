import { PROXY } from './config';

const myHeaders = new Headers();
if (localStorage.access_token) {
  myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
}

const apiSettings = {
  getTickets: () => {
    return fetch(`${PROXY}/tickets`, {
      method: 'GET',
    });
  },
  getMyTicket: () => {
    return fetch(`${PROXY}/tickets/my-ticket`, {
      method: 'GET',
      headers: myHeaders,
    });
  },
  buyTicket: (ticket) => {
    return fetch(`${PROXY}/tickets/${ticket}/buy`, {
      method: 'POST',
      headers: myHeaders,
    });
  },
  applyRaffle: (id) => {
    return fetch(`${PROXY}/raffles/${id}/apply`, {
      method: 'POST',
      headers: myHeaders,
    });
  },
  getRaffle: (id) => {
    return fetch(`${PROXY}/raffles/${id}`, {
      method: 'GET',
      headers: myHeaders,
    });
  },
  getProduct: (id) => {
    return fetch(`${PROXY}/products/${id}`, {
      method: 'GET',
    });
  },
  postPost: (category, option) => {
    return fetch(`${PROXY}/${category}`, option);
  },
  getPost: (category, id) => {
    return fetch(`${PROXY}/${category}/${id}`, {
      method: 'GET',
      headers: myHeaders,
      //header에 token을 실어 보내야 like_or_not 확인이 가능하다
    });
  },
  putPost: (category, id, option) => {
    return fetch(`${PROXY}/${category}/${id}`, option);
  },
  deletePost: (category, id) => {
    return fetch(`${PROXY}/${category}/${id}`, {
      method: 'DELETE',
      headers: myHeaders,
    });
  },
  postComment: (category, id, option) => {
    return fetch(
      `${PROXY}/${category}/${id}/${
        category === 'questions' ? 'answers' : 'comments'
      }`,
      option
    );
  },
  deleteComment: (category, id, commentId) => {
    return fetch(
      `${PROXY}/${category}/${id}/${
        category === 'questions' ? 'answers' : 'comments'
      }/${commentId}`,
      {
        method: 'DELETE',
        headers: myHeaders,
      }
    );
  },
  likePost: (category, id) => {
    return fetch(`${PROXY}/${category}/${id}/like`, {
      method: 'POST',
      headers: myHeaders,
    });
  },
  unlikePost: (category, id) => {
    return fetch(`${PROXY}/${category}/${id}/like`, {
      method: 'DELETE',
      headers: myHeaders,
    });
  },
  getQuestionTypes: () => {
    return fetch(`${PROXY}/question-types`, {
      method: 'GET',
    });
  },
  getAnswer: (id) => {
    return fetch(`${PROXY}/questions/${id}/answers`, {
      method: 'GET',
    });
  },
};

export default apiSettings;
