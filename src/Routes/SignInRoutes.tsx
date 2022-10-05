import { Route, Routes, Navigate } from 'react-router-dom';
import LoginScreen from '../Pages/LoginScreen';
import RecoverPasswordScreen from '../Pages/RecoverPasswordScreen';

const SignInRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginScreen />} />
    <Route path="/recuperar-senha" element={<RecoverPasswordScreen />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default SignInRoutes;
