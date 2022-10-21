import { APIServidores, APIUsuarios } from './baseService';

// export async function getUser(url: string, startModal: (arg0: string) => void) {
//   try {
//     const response = await APIUsuarios.get(url);
//     return response;
//   } catch (e) {
//     if (e.response.status === 500) {
//       startModal('O tempo da sua sessão expirou, faça o login novamente');
//     } else if (error.response.status !== 401) {
//       startModal(
//         'Não foi possível carregar o usuário, tente novamente mais tarde.',
//       );
//     }
//     console.error(error);
//   }
//   return false;
// }
export type SignInPropos = {
  email: string;
  password: string;
};

export async function loginUsuario(email: string, temporaryPassword: string) {
  try {
    const response = await APIUsuarios.post('/login', {
      email: email,
      pass: temporaryPassword,
    });
    if (response.data.message) {
      alert('Email e/ou senha inválidos.');
    } else {
      APIUsuarios.defaults.headers.common['Authorization'] =
        'Bearer ' + response.data.token;
    }
    // APIServidores.defaults.headers;
    // {
    //   ('Authorization');
    //   `x-access-token ${response.data.token}`;
    // }

    return response.data;
  } catch (error) {
    alert('Não foi possivel fazer login. Tente novamente mais tarde.');
    console.error(error);
    return null;
  }
}
export async function confirmPassword(temporaryPassword: string) {
  if (!temporaryPassword) {
    console.log('Senha temporaria inválida');
  }
}
export async function changePassword(
  id: any,
  pass: any,
  startModal: (arg0: string) => void,
) {
  try {
    const response = await APIUsuarios.put(`change-password/${id}`, {
      pass,
    });
    if (response.status === 400) {
      startModal('A senha deve conter pelo menos 6 caracteres');
      console.error(response.data.error);
      return null;
    }
    if (response.status === 404) {
      startModal(
        'Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.',
      );
      console.error(response.data.error);
      return null;
    }
    startModal('Senha alterada com sucesso.');
    return response.data;
  } catch (error) {
    startModal(
      'Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.',
    );
    console.error(error);
    return null;
  }
}
