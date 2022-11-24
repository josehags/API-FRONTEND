import MyRoutes from './Routes';
import UserProvider from './Context';

function App() {
  return (
    <UserProvider>
      <MyRoutes />
    </UserProvider>
  );
}

export default App;
