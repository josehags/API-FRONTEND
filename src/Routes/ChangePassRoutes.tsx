import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChangePasswordScreen from '../Pages/ChangePasswordScreen';
import Dashbord from '../Pages/Dashboard';

const SignRoutes = () => (
  <Router>
    <Dashbord />
    <Route path="/alterar-senha" element={<ChangePasswordScreen />} />
  </Router>
);

export default SignRoutes;
