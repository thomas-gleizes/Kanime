import kitsuApp from "../helpers/api/kistuApp";

export const animes = (limit = 1, offset = 0) => {
  return kitsuApp.get(`/anime?page[limit]=${limit}&page[offset]=${offset}`);
};

export const animeById = (id) => {
  return kitsuApp.get(`/anime/${id}`);
};

export const production = (id) => {
  return kitsuApp.get(`/anime/${id}/productions`);
};

export const company = (id) => {
  return kitsuApp.get(`/media-productions/${id}/company`);
};
