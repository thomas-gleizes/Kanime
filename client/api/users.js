import localApp from "../helpers/api/localApp";

export const register = (data) => {
  return localApp.post("users", data);
};

export const login = (data) => {
  return localApp.post("users/login", data);
};

export const current = () => {
  return localApp.get("users/current");
};

export const find = (username) => {
  return localApp.get(`users/find/${username}`);
};

export const edit = (data) => {
  return localApp.patch(`users`, data);
};

export const follow = (username) => {
  return localApp.patch(`users/${username}/follow`);
};

export const unfollow = (username) => {
  return localApp.patch(`users/${username}/unfollow`);
};

export const all = () => {
  return localApp.get("users/");
};

export const getMedia = (username) => {
  return localApp.get(`users/${username}/media`);
};

export const getRooms = () => {
  return localApp.get("users/rooms");
};
