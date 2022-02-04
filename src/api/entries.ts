import appAxios from '@lib/axios/appAxios';

export const get = (id: string) => appAxios.get(`animes/${id}/entries`);
