import axios from 'axios';
import {
  errorInterceptor,
  responseInterceptor,
} from './axios-config/interceptors';

const Api = axios.create({
  baseURL: process.env.URL_BASE,
});

Api.interceptors.response.use(
  response => responseInterceptor(response),
  error => errorInterceptor(error),
);

export { Api };
