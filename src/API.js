const apiSettings = {
  fetchCommunity: async (category, order = "", searchTerm = "") => {
    const endpoint = `/community/${category}.json${order}${searchTerm}`;
    return await (await fetch(endpoint)).json();
  },
};

export default apiSettings;
