import { useContext } from 'react';
import LoginScreen from '../../Pages/LoginScreen';

import { AuthContext } from './AuthContext';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  //só acessa a pagina se o usuario estiver logado
  if (!auth.user) {
    return <LoginScreen />;
  }
  return children;
};
