import { Button, Checkbox, Form, Input, Layout, Space, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileUser } from '../../contexts/AuthContext';

require('./style.css');

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin } = useProfileUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent) {
    event.preventDefault();

    if (email === '' || password === '') {
      alert('Preencha os dados');
    }

    setLoading(true);

    const data = { email, password };

    await handleLogin(data);

    setLoading(false);
  }

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
        onSubmitCapture={login}
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
              loading={loading}
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
            // onClick={() => handleLogin(loading)}
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
