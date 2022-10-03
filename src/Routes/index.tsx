import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import LoginScreen from '../Pages/LoginScreen';

import SignInRoutes from './SignInRoutes';
/*
import OtherRoutes from './OtherRoutes';
import { useProfileUser } from '../Context';
import NavbarComp from '../Components/NavbarComp';

const Routes = () => {
  const { token } = useProfileUser();
  return (
    <BrowserRouter>
      <NavbarComp />
      {
        token
          ? <OtherRoutes />
          : <SignInRoutes />
      }
    </BrowserRouter>
  );
};
*/
const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SignInRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;
