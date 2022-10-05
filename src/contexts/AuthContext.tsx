import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '../types/User';
import { APIServidores, APIUsuarios } from '../Services/Axios/baseService';
import { changePassword, loginUsuario } from '../Services/Axios/userServices';

interface IAuthContextData {
  logout: () => void;
  user: User | null;
  token: string | undefined;
  handleChangePassword: any;
  handleLogin: (email: string, password: string) => void;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}
const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(true);
  const handleShowMessage = () => setShowMessage(true);
  const [alertState, setAlertState] = useState(true);

  useEffect(() => {
    const storagedToken = localStorage.getItem('@App:token');

    if (!token && storagedToken) {
      const storagedUser = JSON.parse(storagedToken);
      setToken(storagedToken);
      setUser(storagedUser);

      APIUsuarios.defaults.headers;
      {
        ('Authorization');
        `x-access-token ${storagedToken}`;
      }
      APIServidores.defaults.headers;
      {
        ('Authorization');
        `x-access-token ${storagedToken}`;
      }
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

  const startModal = (text: any) => {
    setMessage(text);
    handleShowMessage();
  };

  const handleLogin = async (email: any, temporaryPassword: string) => {
    const userInfo = await loginUsuario(email, temporaryPassword, startModal);
    if (!userInfo) {
      setToken(userInfo?.token);
    }
  };

  const handleChangePassword = async (password: any) => {
    const userInfo = await changePassword(user, password, startModal);
    if (userInfo) {
      setUser(userInfo);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('@App:user');
    setToken('');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        handleLogin,
        logout: handleLogout,
        handleChangePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;

export function useProfileUser() {
  const Context = useContext(AuthContext);
  return { ...Context };
}
