import appAxios from '@lib/api/appAxios';

export const get = (id: string) => appAxios.get(`animes/${id}/entries`);
