import axios from 'axios';
import { BaseUrlServer, BaseUrlUsers } from '../../../Constants/BaseUrl';

export const APIUsers = axios.create({
  baseURL: BaseUrlUsers,
});

export const APIServer = axios.create({
  baseURL: BaseUrlServer,
});
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

APIServer.interceptors.response.use(
  async response => {
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
  error => {
    if (error.response.status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
