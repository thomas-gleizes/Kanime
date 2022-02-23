import axios from 'axios';
import { ApiError } from '@errors';
import LocalStorageService from '@services/localStorage.service';

const appAxios = axios.create({
  baseURL: `/`,
  responseType: 'json',
});

appAxios.interceptors.request.use((config) => {
  const token = LocalStorageService.getToken();
  if (token) config.headers.authorization = `Bearer ${token}`;

  return config;
});

appAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new ApiError(
      error.response.status,
      error.response.data.error || error.response.statusText
    );
  }
);

export default appAxios;
