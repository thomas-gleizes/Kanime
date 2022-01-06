import axios from 'axios';
import { ApiError } from '@errors';

const appAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/`,
  responseType: 'json',
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
