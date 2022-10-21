export {};
// import axios from 'axios';
// import { BaseUrlServidores, BaseUrlUsuarios } from '../Constants/BaseUrl';

// export const APIUsuarios = axios.create({
//   baseURL: BaseUrlUsuarios,
// });

// export const APIServidores = axios.create({
//   baseURL: BaseUrlServidores,
// });

// export const useApi = () => ({
//   validateToken: async (token: string) => {
//     const response = await APIUsuarios.post('valdate', { token });
//     return response.data;
//   },

//   handleLogin: async (email: string, password: string) => {
//     const response = await APIUsuarios.post('login', { email, password });
//     return response.data;
//   },
//   handleLogout: async () => {
//     const response = await APIUsuarios.post('logout');
//     return response.data;
//   },
// });
