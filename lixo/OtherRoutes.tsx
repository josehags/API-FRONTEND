import { Route, Routes, Navigate } from 'react-router-dom';
import { useProfileUser } from '../Context';
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';
import LoginScreen from '../Pages/LoginScreen';
import ProfessionalHomepage from '../Pages/ProfessionalHomepage';
import RecoverPasswordScreen from '../Pages/RecoverPasswordScreen';
import ModalMessage from '../Components/ModalMessage';

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
              <Route path="/nao-autorizado" element={ <ModalMessage type='error' description='Acesso negado!'/>} />
              <Route path="/recuperar-senha" element={ <RecoverPasswordScreen />} />
              <Route path="*" element={ <Navigate to="/" replace />} />
            </Routes>
          )
      }
    </>
  );
};

export default OtherRoutes;