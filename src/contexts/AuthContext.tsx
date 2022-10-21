import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { APIServidores, APIUsuarios } from '../Services/Axios/baseService';
import {
  changePassword,
  loginUsuario,
  SignInPropos,
} from '../Services/Axios/userServices';
import { userInfo } from 'os';

type User = {
  id: string;
  name: string;
  email: string;
};

interface IAuthContextData {
  logout: () => void;
  user: User | null;
  token: string | undefined;
  isAuthenticated: boolean;
  handleChangePassword: any;
  handleLogin: (credentials: SignInPropos) => Promise<void>;
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
  const isAuthenticated = !!user;

  useEffect(() => {
    const storagedToken = localStorage.getItem('@App:token');
    const storagedUser = JSON.parse(
      localStorage.getItem('@App:user') as string,
    );

    console.log(token);

    if (!token && storagedToken && storagedUser) {
      const storagedUser = JSON.parse(storagedToken);
      setToken(storagedToken);
      setUser(storagedUser);

      APIUsuarios.defaults.headers.common['Authorization'] =
        'Bearer ' + 'x-access-token' + storagedToken;

      // APIUsuarios.defaults.headers.common[
      //   'Authorization'
      // ] = `Bearer ${storagedToken}`;

      // APIUsuarios.defaults.headers.common = {
      //   'x-access-token': storagedToken,
      // };
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

  const startModal = (text: string) => {
    setMessage(text);
    handleShowMessage();
  };

  const handleLogin = async ({ email, password }: SignInPropos) => {
    const userInfo = await loginUsuario(email, password);
    if (!userInfo) {
      setToken(token);
      setUser(userInfo);
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
        isAuthenticated,
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
