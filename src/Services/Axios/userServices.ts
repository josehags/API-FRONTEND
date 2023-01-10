import { APIUsers, APIServidores } from './baseService/index';
import { Types } from '../../Context/index';
import { APICep, APICidades, APIEstado } from './baseService/baseService';

export async function getUser(
  url: string,
  startModal: { (type: Types, description: string): void },
) {
  try {
    const response = await APIUsers.get(url);

    return response;
    //
  } catch (error) {
    if (error === 500) {
      startModal(
        'error',
        'O tempo da sua sessão expirou, faça o login novamente',
      );
    } else if (error !== 401) {
      startModal(
        'error',
        'Não foi possível carregar o usuário, tente novamente mais tarde.',
      );
    }
    console.error(error);
  }
  return false;
}

export async function getFourUsers(
  startModal: (type: Types, description: string) => void,
) {
  try {
    const response = await APIUsers.get('/users/newest-four');
    return response;
  } catch (error) {
    if (error === 500) {
      startModal(
        'error',
        'O tempo da sua sessão expirou, faça o login novamente',
      );
    } else if (error !== 401) {
      startModal(
        'error',
        'Não foi possível listar os últimos quatro usuários, tente novamente mais tarde.',
      );
    }
    console.error(error);
  }
  return false;
}

export async function postUser(
  inputName: any,
  inputEmail: any,
  inputRole: any,
  inputSector: any,
  baseImage: any,
  startModal: { (type: Types, description: string): void },
) {
  try {
    await APIUsers.post('signup', {
      name: inputName,
      email: inputEmail,
      role: inputRole,
      sector: inputSector,
      image: baseImage,
    });
    startModal('success', 'Usuário cadastrado com sucesso!');
  } catch (error) {
    if (error === 500) {
      startModal(
        'info',
        'O tempo da sua sessão expirou, faça o login novamente',
      );
    } else if (error !== 401) {
      startModal('warning', 'Email já cadastrado.');
      console.error(
        `Ocorreu um erro inesperado ao registrar um novo usuário.${error}`,
      );
    }
  }
}

export async function loginUser(
  inputEmail: any,
  inputPassword: any,
  startModal: { (type: Types, description: string): void },
) {
  try {
    const response = await APIUsers.post('login', {
      email: inputEmail,
      password: inputPassword,
    });
    console.log(response.data);
    if (response.data.message) {
      startModal('error', 'Email e/ou senha inválidos.');
    } else {
      APIUsers.defaults.headers.common = {
        'x-access-token': response.data.token,
      };
      APIServidores.defaults.headers.common = {
        'x-access-token': response.data.token,
      };
      // eslint-disable-next-line no-constant-condition
      if ('success') {
        response.data.message = null;
      }
    }
    return response.data;
  } catch (error) {
    startModal(
      'error',
      'Não foi possivel fazer login. Tente novamente mais tarde.',
    );
    return null;
  }
}

export const updateUser = async (
  inputName: any,
  inputEmail: any,
  inputRole: any,
  inputSector: any,
  baseImage: any,
  id: any,
  startModal: { (type: Types, description: string): void },
) => {
  try {
    await APIUsers.put(`usuarios/${id}`, {
      name: inputName,
      email: inputEmail,
      role: inputRole,
      sector: inputSector,
      image: baseImage,
    });
    startModal('success', 'Usuário atualizado com sucesso!');
  } catch (error) {
    if (error === 500) {
      startModal(
        'error',
        'O tempo da sua sessão expirou, faça o login novamente',
      );
    } else if (error !== 401) {
      startModal(
        'error',
        'Não foi possivel atualizar o usuário. Tente novamente mais tarde.',
      );
    }
    console.error(
      'error',
      `An unexpected error occurred while updating the user data.${error}`,
    );
  }
};

export async function deleteUser(
  id: any,
  startModal: { (type: Types, description: string): void },
) {
  try {
    await APIUsers.delete(`usuarios/${id}`);
  } catch (error) {
    if (error === 500) {
      startModal(
        'error',
        'O tempo da sua sessão expirou, faça o login novamente',
      );
    } else if (error !== 401) {
      startModal('error', `Não foi possivel deletar o usuário.\n${error}`);
    }
    console.error(error);
  }
}

export async function recoverPassword(
  inputEmail: any,
  startModal: { (type: Types, description: string): void },
) {
  try {
    await APIUsers.post('recover-password', {
      email: inputEmail,
    });
    startModal('success', 'Senha enviada para o email.');
  } catch (error) {
    if (error === 400) {
      startModal(
        'error',
        'Não foi possivel enviar o email de recuperação de senha. Tente novamente mais tarde.',
      );
      console.error(error);
    } else if (error === 404) {
      startModal(
        'error',
        'Não foi possivel encontrar um usuário cadastrado com este email.',
      );
      console.error(error);
    }
  }
}

export async function changePassword(
  id: any,
  pass: any,
  startModal: { (type: Types, description: string): void },
) {
  try {
    const response = await APIUsers.put(`change-password/${id}`, {
      password: pass,
    });
    if (response.status === 400) {
      startModal('error', 'A senha deve conter pelo menos 6 caracteres');
      console.error(response.data.error);
      return null;
    }
    if (response.status === 404) {
      startModal(
        'error',
        'Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.',
      );
      console.error(response.data.error);
      return null;
    }
    startModal('info', 'Senha alterada com sucesso.');
    return response.data;
  } catch (error) {
    startModal(
      'error',
      'Houve um erro ao tentar alterar a senha. Tente novamente mais tarde.',
    );
    console.error(error);
    return null;
  }
}

// busca de endereço

export async function fetchStates() {
  const response = await APIEstado.get('estados/');
  return response;
}

export async function fetchCities(value: any) {
  const response = await APICidades.get(`${value}/municipios`);
  return response;
}

export async function getCep(value: any) {
  const response = await APICep.get(`${value}/json/`);
  return response;
}
