import axios, { AxiosError, AxiosResponse } from 'axios';
import LocalStorageService from 'services/localStorage.service';
import { toast } from 'react-toastify';

const ApiService = axios.create({
  baseURL: `/api/`,
  responseType: 'json',
});

declare module 'axios' {
  interface AxiosResponse extends ApiResponse {}
}

ApiService.interceptors.response.use(
  (response: AxiosResponse): ApiResponse => response.data,
  (error: AxiosError) => {
    if (error.isAxiosError) {
      if (error.response.status === 401) {
        toast.warning('Veuillez vous reconnecter');
        LocalStorageService.clearUser();

        setTimeout(() => window.postMessage({ content: 'unconnected' }), 100);
      } else {
        throw error;
      }
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
