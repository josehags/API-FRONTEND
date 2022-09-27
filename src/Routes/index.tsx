import { BrowserRouter } from 'react-router-dom';
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
      <LoginScreen>
        <SignInRoutes />
      </LoginScreen>
    </BrowserRouter>
  );
};

export default Routes;
