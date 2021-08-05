import localApp from "../helpers/api/localApp";

export const search = (query) => {
  return localApp.get(`categories/${query}/search`);
};

export const getById = (id) => {
  return localApp.get(`categories/${id}`);
};
