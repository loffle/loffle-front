import { PROXY } from './config';

const apiSettings = {
  getTickets: () => {
    return fetch(`${PROXY}/tickets`, {
      method: 'GET',
    });
  },
};

export default apiSettings;
