import { Route, Routes, Navigate } from 'react-router-dom';
/*
import RegisterScreen from '../Pages/RegisterScreen';
import ListScreen from '../Pages/ListScreen';
import ClientRegisterScreen from '../Pages/ClientRegisterScreen';
import ListCategories from '../Pages/ListCategories';
import ClientUpdateScreen from '../Pages/ClientUpdateScreen';
import ClientListScreen from '../Pages/ClientListScreen';
import ClientProfileScreen from '../Pages/ClientProfileScreen';
import UserUpdateScreen from '../Pages/UserUpdateScreen';
import ListSectors from '../Pages/ListSectors';
import CreateDemandsScreen from '../Pages/CreateDemandsScreen';
import ViewDemandsScreen from '../Pages/ViewDemandsScreen';
import ListDemandsScreen from '../Pages/ListDemandsScreen';
import UpdateDemandsScreen from '../Pages/UpdateDemandScreen';
import LoginScreen from '../Pages/LoginScreen';
import UnauthorizedScreen from '../Pages/Unauthorized';
import RecoverPasswordScreen from '../Pages/RecoverPasswordScreen';
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';
import ProfessionalHomepage from '../Pages/ProfessionalHomepage';
import ClientFeaturesScreen from '../Pages/ClientFeaturesScreen';
import CargosScreen from '../Pages/ListCargos';
import RegisterCargosScreen from '../Pages/RegisterCargos';
import WorkspaceListScreen from '../Pages/WorkplaceScreen';
import StatisticByCategory from '../Pages/StatisticsScreen/ByCategory';
import StatisticBySectors from '../Pages/StatisticsScreen/BySectors';
import StatisticClientScreen from '../Pages/StatisticsScreen/ByClients';
import { useProfileUser } from '../Context';

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
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';
import LoginScreen from '../Pages/LoginScreen';
import ProfessionalHomepage from '../Pages/ProfessionalHomepage';
import RecoverPasswordScreen from '../Pages/RecoverPasswordScreen';

const OtherRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProfessionalHomepage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/recuperar-senha" element={<RecoverPasswordScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      )
    </>
  );
};

export default OtherRoutes;
