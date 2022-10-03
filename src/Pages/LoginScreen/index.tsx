import { Button, Checkbox, Form, Input, Layout, Space, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
require('./style.css');

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-empty-pattern
  const {} = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('login');
    console.log('email', email);
    console.log('password', password);
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);

    navigate('/criar-senha', { replace: true });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    navigate('/criar-senha', { replace: true });
  };
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
            onChange={e => setEmail(e.target.value)}
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
            onChange={e => setPassword(e.target.value)}
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
          <Button
            className="my-button"
            type="primary"
            htmlType="submit"
            onClick={handleLogin}
          >
            <PoweroffOutlined />
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default LoginScreen;
