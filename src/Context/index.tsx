import { createContext, useContext, useState, useEffect } from 'react';
import { APIUsers, APIServidores } from '../Services/Axios/baseService';
import {
  loginUser,
  changePassword,
  recoverPassword,
} from '../Services/Axios/userServices';
import ModalMessage from '../Components/ModalMessage';

type UserTipo = {
  id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
  password?: string;
  temporaryPassword: boolean;
};

type UserTipoContext = {
  user: UserTipo | null;
  setUser: any;
  token: string | null;
  setToken: any;
  startModal: any;
  handleLogin: any;
  handleLogout: any;
  handlePassword: any;
  handleChangePassword: any;
};

export type Types = 'success' | 'warning' | 'error' | 'info';

const UserContext = createContext<UserTipoContext>({} as UserTipoContext);

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserTipo | null>(null);
  const [message, setMessage] = useState('');
  const [typeMessage, setTypeMessage] = useState<Types>(null!);

  useEffect(() => {
    const storagedToken = localStorage.getItem('@App:token');
    const storagedUser = localStorage.getItem('@App:user');

    if (!token && storagedToken && storagedUser) {
      setToken(storagedToken);
      setUser(JSON.parse(storagedUser));
      APIUsers.defaults.headers.common = { 'x-access-token': storagedToken };
      APIServidores.defaults.headers.common = {
        'x-access-token': storagedToken,
      };
    }
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem('@App:token', token);
      localStorage.setItem('@App:user', JSON.stringify(user));
    }
  }, [token, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('@App:user', JSON.stringify(user));
    }
  }, [user]);

  const startModal = (type: Types, text: string) => {
    setMessage(text);
    setTypeMessage(type);
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
  };

  const handleChangePassword = async (password: any) => {
    if (user !== null) {
      const userInfo = await changePassword(user.id, password, startModal);
      if (userInfo) {
        setUser(userInfo);
      }
    }
  };

  const handleLogin = async (email: any, password: any) => {
    console.log(email, password);
    const userInfo = await loginUser(email, password, startModal);
    if (!userInfo.message) {
      setToken(userInfo?.token);
      setUser(userInfo?.profile);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.clear();
      setToken(localStorage.getItem('@App:token'));
      APIUsers.defaults.headers.common = null!;
    } catch (error) {
      startModal('error', 'Não foi possível realizar o logout!');
    }
  };

  const handlePassword = async (email: any) => {
    await recoverPassword(email, startModal);
  };

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        handleLogin,
        handleLogout,
        handlePassword,
        startModal,
        handleChangePassword,
      }}
    >
      {children}
      <ModalMessage type={typeMessage} description={message} />
    </UserContext.Provider>
  );
};

export default UserProvider;

export function useProfileUser() {
  const Context = useContext(UserContext);
  return { ...Context };
}
