import { Route, Routes, Navigate } from 'react-router-dom';
/*
const OtherRoutes = () => {
  const { user } = useProfileUser();

  return (
    <>
      {
        user && user?.temporaryPassword
          ? (
            <Routes>
              <Route path="/" element={ <ChangePasswordScreen />} />
              <Route path="*" element={ <Navigate to="/" replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={ <ProfessionalHomepage /> } />
              <Route path="/login" element={ <LoginScreen />} />
              <Route path="/nao-autorizado" element={ <UnauthorizedScreen />} />
              <Route path="/recuperar-senha" element={ <RecoverPasswordScreen />} />
              <Route path="*" element={ <Navigate to="/" replace />} />
            </Routes>
          )
      }
    </>
  );
};
*/

import LoginScreen from '../Pages/LoginScreen';
import ProfessionalHomepage from '../Pages/ProfessionalHomepage';

const OtherRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfessionalHomepage />} />
        <Route path="/login" element={<LoginScreen />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default OtherRoutes;
