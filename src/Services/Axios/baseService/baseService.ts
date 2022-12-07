import axios from 'axios';
import {
  BaseUrlUsers,
  BaseUrlServidores,
  BaseUrlEstado,
  BaseUrlCidade,
  BAseUrlCep,
} from '../../../Constants/baseUrl';

export const APIUsers = axios.create({
  baseURL: BaseUrlUsers,
});

export const APIServidores = axios.create({
  baseURL: BaseUrlServidores,
});

export const APICidades = axios.create({
  baseURL: BaseUrlCidade,
});
export const APIEstado = axios.create({
  baseURL: BaseUrlEstado,
});

export const APICep = axios.create({
  baseURL: BAseUrlCep,
});

APICidades.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

APIEstado.interceptors.response.use(
  async response => response,
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

APIUsers.interceptors.response.use(
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
  async response => {
    try {
      const authToken = response.status;
      if (authToken === 500 || authToken === 401) {
        localStorage.clear();
        window.location.reload();
      }
      return response;
    } catch (err) {
      return response;
    }
  },
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
