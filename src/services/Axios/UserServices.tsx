export {};
// import { APIServer, APIUsers } from './BaseService/BaseService';

// export async function loginUser(
//   inputEmail: any,
//   inputPassword: any,
//   startModal: (arg0: string) => void,
// ) {
//   try {
//     const response = await APIUsers.post('login', {
//       email: inputEmail,
//       pass: inputPassword,
//     });
//     if (response.data.message) {
//       startModal('Email e/ou senha inválidos.');
//     }
//     return response.data;
//   } catch (error) {
//     startModal('Não foi possivel fazer login. Tente novamente mais tarde.');
//     console.error(error);
//     return null;
//   }
// }

// export async function recoverPassword(
//   inputEmail: any,
//   startModal: (arg0: string) => void,
// ) {
//   try {
//     await APIUsers.post('recover-password', {
//       email: inputEmail,
//     });
//     startModal('Senha enviada para o email.');
//   } catch (error: any) {
//     if (error.response.status === 400) {
//       startModal(
//         'Não foi possivel enviar o email de recuperação de senha. Tente novamente mais tarde.',
//       );
//       console.error(error);
//     } else if (error.response.status === 404) {
//       startModal(
//         'Não foi possivel encontrar um usuário cadastrado com este email.',
//       );
//       console.error(error);
//     }
//   }
// }
// export async function changePassword(
//   id: any,
//   pass: any,
//   startModal: (arg0: string) => void,
// ) {
//   try {
//     const response = await APIUsers.put(`change-password/${id}`, {
//       pass,
//     });
//     if (response.status === 400) {
//       startModal('A senha deve conter pelo menos 6 caracteres');
//       console.error(response.data.error);
//       return null;
//     }
//     if (response.status === 404) {
//       startModal(
//         'Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.',
//       );
//       console.error(response.data.error);
//       return null;
//     }
//     startModal('Senha alterada com sucesso.');
//     return response.data;
//   } catch (error) {
//     startModal(
//       'Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.',
//     );
//     console.error(error);
//     return null;
//   }
// }
