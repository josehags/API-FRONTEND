import { Button, Checkbox, Form, Input, Layout, Space, Typography } from 'antd';
import { PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileUser } from '../../Context';
require('./style.css');

const LoginScreen: React.FC = () => {
  //  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const [emailReceived, setEmailReceived] = useState('');
  const [passwordReceived, setPasswordReceived] = useState('');
  const { handleLogin, user } = useProfileUser();

  if (localStorage.getItem('@App:token')) {
    navigate('/', { replace: true });
  }

  const onFinish = (values: any) => {
    /*    setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
      navigate('/home', { replace: true });
      */
    handleLogin(emailReceived, passwordReceived);
    navigate('/', { replace: true });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    navigate('/', { replace: true });
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
            onChange={e => setEmailReceived(e.target.value)}
            placeholder="Informe o email do usuário"
          />
        </Form.Item>

        {user?.temporaryPassword ? (
          <Form.Item
            label="Senha"
            name="Password"
            rules={[
              { required: true, message: 'Por favor, informe sua senha!' },
            ]}
            hasFeedback
          >
            <Input.Password
              onChange={e => setPasswordReceived(e.target.value)}
              allowClear
              placeholder="Informe sua senha"
              autoComplete="off"
            />
          </Form.Item>
        ) : (
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
              onChange={e => setPasswordReceived(e.target.value)}
              allowClear
              placeholder="Informe sua senha"
              autoComplete="off"
            />
          </Form.Item>
        )}

        <Form.Item wrapperCol={{ offset: 5, span: 20 }}>
          <Space size={120}>
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

        <Form.Item wrapperCol={{ offset: 16 }}>
          {/*        <Button className="my-button" type="primary" loading={loading} href='/home' htmlType="submit" >   */}
          {/*        <Button className="my-button" type="primary" href='/home' htmlType="submit" >   */}
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
