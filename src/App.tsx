import AuthProvider from './contexts/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';

function App() {
  return (
    <AuthProvider>
      <Routes />
      <ToastContainer autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
