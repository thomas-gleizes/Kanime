import axios, { AxiosError, AxiosResponse } from 'axios';
import LocalStorageService from 'services/localStorage.service';
import toast from 'utils/toastr';
import { routes } from 'resources/routes';

const ApiService = axios.create({
  baseURL: `/api/`,
  responseType: 'json',
});

ApiService.interceptors.response.use(
  (response: AxiosResponse): any => response.data,
  (error: AxiosError) => {
    if (error.isAxiosError) {
      if (error.response.status === 401) {
        toast('Veuillez vous reconner', 'warning');
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
