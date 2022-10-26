import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { APIServidores, APIUsuarios } from '../Services/Axios/baseService';
import { changePassword, loginUsuario } from '../Services/Axios/userServices';
import { userInfo } from 'os';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  name: string;
  email: string;
};
type SignInPropos = {
  email: string;
  password: string;
};

interface IAuthContextData {
  logout: () => void;
  user: User | null;
  token: string | undefined;
  isAuthenticated: boolean;
  handleChangePassword: any;
  signIn: (credentials: SignInPropos) => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const handleCloseMessage = () => setShowMessage(true);
  const handleShowMessage = () => setShowMessage(true);

  // useEffect(() => {
  //   const storagedToken = localStorage.getItem('@App:token');
  //   const storagedUser = JSON.parse(
  //     localStorage.getItem('@App:user') as string,
  //   );

  //   console.log(token);

  //   if (!token && storagedToken && storagedUser) {
  //     const storagedUser = JSON.parse(storagedToken);
  //     setToken(storagedToken);
  //     setUser(storagedUser);

  //     APIUsuarios.defaults.headers.common['Authorization'] =
  //       'Bearer ' + 'x-access-token' + storagedToken;

  // APIUsuarios.defaults.headers.common[
  //   'Authorization'
  // ] = `Bearer ${storagedToken}`;

  // APIUsuarios.defaults.headers.common = {
  //   'x-access-token': storagedToken,
  // };
  //   }
  // }, []);

  // useEffect(() => {
  //   if (token) {
  //     localStorage.setItem('@App:token', token);
  //     localStorage.setItem('@App:user', JSON.stringify(user));
  //   }
  // }, [token, user]);

  // useEffect(() => {
  //   if (user) {
  //     localStorage.setItem('@App:user', JSON.stringify(user));
  //   }
  // }, [user]);

  const startModal = (text: string) => {
    setMessage(text);
    handleShowMessage();
  };

  const signIn = async ({ email, password }: SignInPropos) => {
    try {
      const response = await APIUsuarios.post('/login', {
        email,
        password,
      });

      const { id, name, token } = response.data;
      console.log(response.data);

      const storagedToken = JSON.parse(
        localStorage.getItem('@App:user') as string,
      );
      const storagedUser = JSON.parse(
        localStorage.getItem('@App:user') as string,
      );

      if (token) {
        setToken(storagedToken);
        localStorage.setItem('@App:token', token);
        localStorage.setItem('@App:user', JSON.stringify(user));
      }
      setUser(storagedUser);
      setUser({
        id,
        name,
        email,
      });

      //Passar para proximas requisiçoes o nosso token
      APIUsuarios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success('Logado com sucesso!');
      //

      //
    } catch (err) {
      toast.error('Erro ao acessar!');
      console.log('ERRO AO ACESSAR ', err);
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
        signIn,
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
