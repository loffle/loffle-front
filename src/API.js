const apiSettings = {
  fetchCommunity: async (category, order = "") => {
    const endpoint = `/community/${category}.json${order}`;
    return await (await fetch(endpoint)).json();
  },
};

export default apiSettings;
