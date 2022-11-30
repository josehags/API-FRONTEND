import ReactDOM from 'react-dom/client';
import App from './App';
import 'antd/dist/reset.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ConfigProvider
    locale={ptBR}
    theme={{
      token: {
        colorPrimary: 'rgb(0, 21, 42)',
        colorLink: '#white',
        colorLinkHover: ' rgb(134, 142, 151)',
        borderRadius: 3,
        colorTextHeading: 'rgb(0, 21, 42)',
      },
    }}
  >
    <App />
  </ConfigProvider>,
);
