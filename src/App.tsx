import { AuthProvider } from './contexts';
import LoginScreen from './Pages/LoginScreen';
import Routes from './Routes';
/*
import UserProvider from './Context';

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}
*/
function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
