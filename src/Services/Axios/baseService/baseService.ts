import axios from 'axios';
import { BaseUrlServidores, BaseUrlUsuarios } from '../../../Constants/BaseUrl';

export const APIUsuarios = axios.create({
  baseURL: BaseUrlUsuarios,
  headers: {
    Authorization: `Bearer ${localStorage['@App:token']}`,
  },
});

export const APIServidores = axios.create({
  baseURL: BaseUrlServidores,
});

APIUsuarios.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

APIServidores.interceptors.response.use(
  async (response: { status: any }) => {
    try {
      const authToken = await response.status;
      if (authToken === 500 || authToken === 401) {
        localStorage.clear();
        window.location.reload();
      }
      return response;
    } catch (err) {
      return response;
    }
  },
  (error: { response: { status: number } }) => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
