import { Button, Checkbox, Form, Input, Layout, Space, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts';
require('./style.css');

interface ILoginProps {
  children: React.ReactNode;
}
const LoginScreen: React.FC<ILoginProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);

    navigate('/criar-senha', { replace: true });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    navigate('/criar-senha', { replace: true });
  };
  if (isAuthenticated) return <>{children}</>;
  return (
    <Layout className="containerLogin">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="loginScreen"
      >
        <Typography.Title level={3} className="page-header-login" underline>
          SISTEMA
        </Typography.Title>

        <Form.Item
          label="Usuário"
          name="Username"
          rules={[
            {
              required: true,
              message: 'Por favor, insira seu email de acesso ao sistema!',
            },
            { type: 'email', message: 'Por favor, informe um email válido!' },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined />}
            allowClear
            maxLength={60}
            placeholder="Informe o email do usuário"
            value={email}
            onChange={handleEmailInput}
          />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="Password"
          rules={[
            { required: true, message: 'Por favor, informe sua senha!' },
            { min: 6 },
            {
              validator: (_, value) =>
                value &&
                !(value === value.toUpperCase()) &&
                !(value === value.toLowerCase()) &&
                value.search(/\W|_/) !== -1
                  ? Promise.resolve()
                  : Promise.reject(
                      'A senha deve ter ao menos uma letra Maiúscula/Minuscula/Caracter Especial',
                    ),
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={password}
            onChange={handlePasswordInput}
            placeholder="Informe sua senha"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 15 }}>
          <Space size={170}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembrar senha</Checkbox>
            </Form.Item>

            <Button
              className="login-form-forgot"
              type="link"
              href="/recuperar-senha"
            >
              Esqueci a senha!
            </Button>
          </Space>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17 }}>
          <Button className="my-button" type="primary" htmlType="submit">
            <PoweroffOutlined />
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default LoginScreen;
