import localApp from "../helpers/api/localApp";

export const all = (params) => {
  return localApp.get("sagas", { params });
};

export const findBySlug = (slug) => {
  return localApp.get(`sagas/slug/${slug}`);
};

export const findById = (id) => {
  return localApp.get(`sagas/id/${id}`);
};
