import { Route, Routes, Navigate } from 'react-router-dom';
import { useProfileUser } from '../contexts/AuthContext';
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';

import LoginScreen from '../Pages/LoginScreen';
// import ProfessionalHomepage from '../Pages/ProfessionalHomepage';

const OtherRoutes = () => {
  const { user } = useProfileUser();

  return (
    <>
      <Routes>
        {user && user?.temporaryPassword ? (
          <>
            <Route path="/" element={<ChangePasswordScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </>
  );
};

export default OtherRoutes;
