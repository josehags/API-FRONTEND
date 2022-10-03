import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.URL_BASE,
});

export const getUsuarios = async (
  user: string,
  query: string | AxiosRequestConfig<any> | undefined,
) => {
  let url = '/usuarios';
  if (query !== '') {
    url += `?q${query}`;
  }
  return api.get(url);
};
