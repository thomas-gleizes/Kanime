import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import LocalStorageService from 'services/localStorage.service';
import HttpStatus from 'resources/HttpStatus';
import { WINDOW_MESSAGE } from 'resources/constants';
import { ApiException } from 'exceptions';

let currentRequests: number = 0;

const ApiService = axios.create({
  baseURL: `/api/`,
  responseType: 'json',
});

declare module 'axios' {
  interface AxiosResponse extends ApiResponse {}
}

ApiService.interceptors.request.use((config) => {
  if (!currentRequests) window.postMessage(WINDOW_MESSAGE.GLOBAL_LOADING.START);

  currentRequests++;

  return config;
});

ApiService.interceptors.response.use(
  (response: AxiosResponse) => {
    window.postMessage('api-call-finished', '*');

    currentRequests--;
    if (currentRequests === 0) window.postMessage(WINDOW_MESSAGE.GLOBAL_LOADING.STOP);

    return response.data;
  },
  (error: AxiosError<any, { message: string; errors: string[] }>) => {
    currentRequests--;
    if (currentRequests === 0) window.postMessage(WINDOW_MESSAGE.GLOBAL_LOADING.STOP);

    if (error.isAxiosError && error.response) {
      if (error.response.status === HttpStatus.UNAUTHORIZED) {
        toast.warning('Veuillez vous reconnecter');
        LocalStorageService.clearUser();

        setTimeout(() => window.postMessage({ content: 'unconnected' }), 100);
      } else if (error.response.data) {
        throw new ApiException(
          error.response.data.message,
          error.response.status,
          error.response.data.errors
        );
      } else throw new Error("Une erreur s'est produite");
    } else throw error;
  }
);

const kitsuService = axios.create({
  baseURL: 'https://kitsu.io/api/edge/',
  responseType: 'json',
});

kitsuService.interceptors.response.use(
  (response: AxiosResponse): any => response.data,
  (error: any) => {
    throw error;
  }
);

export { ApiService, kitsuService };
