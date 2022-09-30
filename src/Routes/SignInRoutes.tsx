import { Route, Routes, Navigate } from 'react-router-dom';
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';
import LoginScreen from '../Pages/LoginScreen';
import ProfessionalHomePage from '../Pages/ProfessionalHomepage';
import RecoverPasswordScreen from '../Pages/RecoverPasswordScreen';

const SignInRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginScreen children={undefined} />} />

    <Route path="/recuperar-senha" element={<RecoverPasswordScreen />} />
    <Route path="/criar-senha" element={<ChangePasswordScreen />} />
    <Route path="/home" element={<ProfessionalHomePage />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default SignInRoutes;
