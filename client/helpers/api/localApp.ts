import axios from "axios";

import authServices from "../authServices";
import { ApiError } from "../interfaces/global";

const localApp = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API}api/`,
  responseType: "json",
});

let currentRequests = 0;

localApp.interceptors.request.use((config) => {
  const token = authServices.getToken();
  if (token) config.headers.Authorization = token;

  if (process.browser) {
    currentRequests++;
    if (currentRequests === 1) localStorage.setItem("loader", "true");
  }

  return config;
});

localApp.interceptors.response.use(
  (response) => {
    if (process.browser) {
      currentRequests--;
      if (currentRequests === 0) localStorage.setItem("loader", "false");
    }

    return response;
  },
  (err) => {
    if (process.browser) {
      currentRequests--;
      if (currentRequests === 0) localStorage.setItem("loader", "false");
    }

    const error: ApiError = {
      status: parseInt(err.response.status) || 400,
      message: err.response?.data?.message || err.response.statusText,
      data: err.response?.data,
    };

    throw { ...error };
  }
);

export default localApp;
