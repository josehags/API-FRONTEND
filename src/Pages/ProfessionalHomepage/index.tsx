import {
  UserOutlined,
  PoweroffOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { MenuProps, Typography, Breadcrumb, Layout, Menu } from 'antd';
import React, { Children, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard';
import FormServer from '../FormServer';
import { useProfileUser } from '../../Context';
import FormUser from '../FormUser';
require('./style.css');

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Usuários', '2', <UserOutlined />),
  getItem('Servidores', '3', <TeamOutlined />),
  getItem('Sair', '4', <PoweroffOutlined />),
];

const ProfessionalHomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [chave, setChave] = useState('1');
  const navigate = useNavigate();
  const { handleLogout } = useProfileUser();

  const rotas = (item: any) => {
    if (item.key === '1') {
      window.location.reload();
    }
    if (item.key === '4') {
      handleLogout();
      navigate('/', { replace: true });
    }
    setChave(item.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
      >
        <img
          className="logo"
          src="Brasao.png"
          alt="Brasão PC"
          width={50}
          height={100}
          onClick={() => {
            rotas({ key: '1' });
          }}
        />
        <Typography.Text style={{ color: '#fff', fontSize: '16' }}>
          Polícia Civil
        </Typography.Text>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onSelect={rotas}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>
              {
                {
                  '1': <span>Dashboard</span>,
                  '2': <span>Usuários</span>,
                  '3': <span>Servidores</span>,
                }[chave]
              }
            </Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {
              {
                '1': <Dashboard />,
                '2': <FormUser />,
                '3': <FormServer />,
              }[chave]
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Criado por DIT - Divisão de Inovação e Tecnologia
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ProfessionalHomePage;
