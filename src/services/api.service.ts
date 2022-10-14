import axios, { AxiosError, AxiosResponse } from 'axios';
import LocalStorageService from 'services/localStorage.service';
import { toast } from 'react-toastify';
import HttpStatus from 'resources/HttpStatus';
import { ApiException } from 'exceptions';

const ApiService = axios.create({
  baseURL: `/api/`,
  responseType: 'json',
});

declare module 'axios' {
  interface AxiosResponse extends ApiResponse {}
}

ApiService.interceptors.request.use((config) => {
  window.postMessage('api-call-started', '*');

  return config;
});

ApiService.interceptors.response.use(
  (response: AxiosResponse) => {
    window.postMessage('api-call-finished', '*');

    return response.data;
  },
  (error: AxiosError<any, { message: string; errors: string[] }>) => {
    window.postMessage('api-call-finished', '*');

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
