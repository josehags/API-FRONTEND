import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useProfileUser } from '../Context';
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';
import LoginScreen from '../Pages/LoginScreen';
import ProfessionalHomepage from '../Pages/ProfessionalHomepage';
import RecoverPasswordScreen from '../Pages/RecoverPasswordScreen';
import UserUpdate from '../Pages/UserUpdate';

const MyRoutes = () => {
  const { token, user } = useProfileUser();
  return (
    <BrowserRouter>
      {token ? (
        user && user?.temporaryPassword ? (
          <Routes>
            <Route path="/" element={<ChangePasswordScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<ProfessionalHomepage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route
              path="/recuperar-senha"
              element={<RecoverPasswordScreen />}
            />
            <Route path="/usuarios" element={<LoginScreen />} />
            <Route path="/usuarios/:id" element={<UserUpdate />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )
      ) : (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/recuperar-senha" element={<RecoverPasswordScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default MyRoutes;
