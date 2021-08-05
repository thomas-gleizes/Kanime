import localApp from "../helpers/api/localApp";

export const search = (query, params) => {
  return localApp.get(`animes/search/${query}`, { params });
};

export const slug = (slug) => {
  return localApp.get(`animes/slug/${slug}`);
};

export const insert = (data) => {
  return localApp.post("animes", data);
};

export const all = (params) => {
  return localApp.get("animes", { params });
};

export const mostPopular = (params) => {
  return localApp.get(`animes/popularity`, { params });
};

export const mostRated = (params) => {
  return localApp.get(`animes/rating`, { params });
};

export const thisSeason = (params) => {
  return localApp.get("animes/season", { params });
};
