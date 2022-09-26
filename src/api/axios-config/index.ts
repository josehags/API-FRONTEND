import axios from 'axios';
import { BaseUrlUsers } from '../../Constants/BaseUrl';
import { errorInterceptor, responseInterceptor } from './interceptors';

const Api = axios.create({
  baseURL: BaseUrlUsers,
});

Api.interceptors.response.use(
  response => responseInterceptor(response),
  error => errorInterceptor(error),
);

export { Api };
