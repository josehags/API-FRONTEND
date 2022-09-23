import { Button, Form, Input, Layout, Typography } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

require('./style.css');

const ChangePasswordScreen: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="containerPassword">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="passwordScreen"
      >
        <Typography.Title level={3} className="page-header-password" underline>
          ALTERAR SENHA
        </Typography.Title>
        <Form.Item
          label="Senha"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor, insira a nova senha de acesso ao sistema!',
            },
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
            placeholder="Informe a nova senha para o usuário"
            type="password"
            // onChange={text => setPassword(password)}
            // value={password || ''}
          />
        </Form.Item>

        <Form.Item
          label="Confirme a Senha"
          name="confirmPassword"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Por favor, confirme a nova senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('As senhas informadas são diferentes');
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Confirme sua nova senha"
            // onChange={text => setConfirmPassword(confirmPassword)}
            // value={confirmPassword || ''}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17 }}>
          <Button className="botao" type="primary">
            <Link
              to={'/home'}
              // onChange={() => handleChangePassword(password, confirmPassword)}
            >
              Confirmar
            </Link>
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default ChangePasswordScreen;
