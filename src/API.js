import { PROXY } from './config';
import axios from 'axios';

const myHeaders = new Headers();
if (localStorage.access_token) {
  myHeaders.append('Authorization', `Token ${localStorage.access_token}`);
}

const apiSettings = {
  getUser: (id) => {
    return fetch(`${PROXY}/users/${id}`, {
      method: 'GET',
      headers: myHeaders,
    });
  },
  getCategory: (category) => {
    return fetch(`${PROXY}/${category}`, {
      method: 'GET',
    });
  },
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
  getRaffle: (id, users) => {
    return fetch(`${PROXY}/raffles/${id}${users ? '/users' : ''}`, {
      method: 'GET',
      headers: myHeaders,
    });
  },
  getGivenNumber: (id) => {
    return fetch(`${PROXY}/raffles/${id}/candidates`, {
      method: 'GET',
      headers: myHeaders,
    });
  },
  getProduct: (id) => {
    return fetch(`${PROXY}/products/${id}`, {
      method: 'GET',
    });
  },
  getCandidate: (id) => {
    return axios({
      method: 'GET',
      url: `${PROXY}/raffles/${id}/users.json`,
    });
  },
  postPost: (category, option) => {
    return fetch(`${PROXY}/${category}`, option);
  },
  getPost: (category, id) => {
    return fetch(`${PROXY}/${category}/${id}`, {
      method: 'GET',
      headers: myHeaders,
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
  checkInfo: (category, option) => {
    return fetch(`${PROXY}/check-${category}`, option);
  },
  postAccount: (category, option) => {
    //category : login, signup, logout
    return fetch(`${PROXY}/${category}`, option);
  },
};

export default apiSettings;
