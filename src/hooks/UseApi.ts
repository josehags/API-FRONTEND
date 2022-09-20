// //responsavel pelas requisições

// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API,
// });

// export const useApi = () => ({
//   validateToken: async (token: string) => {
//     const response = await api.post('/validate', { token });
//     return response.data;
//   },

//   signin: async (username: string, password: string) => {
//     //retornado resposta falsa antes da original
//     return {
//       user: { id: 3, name: 'José', username: 'jose@gmail.com' },
//       token: '123456789',
//     };
//     // const response = await api.post('/signin', {
//     //   username: username,
//     //   password: password,
//     // });
//   },

//   logout: async () => {
//     const response = await api.post('/logout');
//     return response.data;
//   },
// });
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

export const useApi = () => ({
  validateToken: async (token: string) => {
    return {
      user: { id: 3, name: 'José', email: 'jose@gmail.com' },
    };
    // const response = await api.post('/validate', { token });
    // return response.data;
  },
  signin: async (email: string, password: string) => {
    return {
      user: { id: 3, name: 'José', email: 'jose@gmail.com' },
      token: '123456789',
    };
    // const response = await api.post('/signin', { email, password });
    // return response.data;
  },
  logout: async () => {
    return { status: true };
    // const response = await api.post('/logout');
    // return response.data;
  },
});
