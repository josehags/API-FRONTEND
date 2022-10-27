import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChangePasswordScreen from '../src/Pages/ChangePasswordScreen';

const SignRoutes = () => (
  <Router>
    <Route path="/alterar-senha" element={ <ChangePasswordScreen />} />
  </Router>
);

export default SignRoutes;
