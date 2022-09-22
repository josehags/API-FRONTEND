import { useContext, useEffect, useState } from 'react';
// import { changePassword } from '../../services/Axios/UserServices';
// import { useApi } from '../../services/UseApi';

import { User } from '../../types/User';
import { AuthContext } from './AuthContext';

const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(null);
  // const api = useApi();
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => setShowMessage(true);

  // useEffect(() => {
  //   const validateToken = async () => {
  //     const storageData = localStorage.getItem('authToken');
  //     if (storageData) {
  //       const data = await api.validateToken(storageData);
  //       if (data.user) {
  //         setUser(data.user);
  //       }
  //     }
  //   };
  //   validateToken();
  // }, [api]);

  // const signin = async (email: string, password: string) => {
  //   const data = await api.signin(email, password);
  //   if (data.user && data.token) {
  //     setUser(data.user);
  //     setToken(data.token);
  //     return true;
  //   }
  //   return false;
  // };

  // const signout = async () => {
  //   await api.logout();
  //   setUser(null);
  //   setToken('');
  // };

  const setToken = (token: string) => {
    localStorage.setItem('authToken', token);
  };
  const startModal = (text: any) => {
    postMessage(text);
    handleShowMessage();
  };

  // const handleChangePassword = async (password: any) => {
  //   const userInfo = await changePassword(user?.id, password, startModal);
  //   if (userInfo) {
  //     setUser(userInfo);
  //   }
  // };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export default UserProvider;

export function useProfileUser() {
  const Context = useContext(AuthContext);
  return { ...Context };
}
