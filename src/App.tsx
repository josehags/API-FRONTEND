import MyRoutes from './Routes';
import UserProvider from './Context';
import ConfigProvider from 'antd/lib/config-provider';

function App() {
  return (
    <UserProvider>
      <MyRoutes />
    </UserProvider>
  );
}

export default App;
