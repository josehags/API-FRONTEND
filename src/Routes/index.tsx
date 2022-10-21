import { BrowserRouter } from 'react-router-dom';
// import { useProfileUser } from '../contexts/AuthContext';
// import Dashbord from '../Pages/Dashboard';
// import OtherRoutes from './OtherRoutes';

import SignInRoutes from './SignInRoutes';

const Routes = () => {
  // const { token } = useProfileUser();
  return (
    <BrowserRouter>
      {/* <Dashbord /> esta sumindo com a tela de login*/}
      {/* { <OtherRoutes /> : <SignInRoutes />} */}
      <SignInRoutes />
    </BrowserRouter>
  );
};

export default Routes;
