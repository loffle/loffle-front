import axios from "axios";

const apiSettings = {
  fetchPost: async () => {
    const endpoint = "/community/post.json";
    return await (await fetch(endpoint)).json();
    //return await axios.get(endpoint);
  },
};

export default apiSettings;
