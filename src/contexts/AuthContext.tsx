import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { AuthService } from '../api/AuthService';

interface IAuthContextData {
  logout: () => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  //acessToken: string | undefined;
}

const AuthContext = createContext({} as IAuthContextData);

const LOCAL_STORAGE_KEY__ACESS_TOKEN = 'APP_ACCESS_TOKEN';

interface IAuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [acessToken, setAcessToken] = useState<string>();

  useEffect(() => {
    const acessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACESS_TOKEN);
    if (acessToken) {
      setAcessToken(JSON.parse(acessToken));
    } else {
      setAcessToken(undefined);
    }
  }, []);

  //
  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if (result instanceof Error) {
      return result.message;
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEY__ACESS_TOKEN,
        JSON.stringify(result.accessToken),
      );
      setAcessToken(result.accessToken);
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACESS_TOKEN);

    setAcessToken(undefined);
  }, []);

  const isAuthenticated = useMemo(() => !!acessToken, [acessToken]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

// export function useProfileUser() {
//   const Context = useContext(AuthContext);
//   return { ...Context };
// }
