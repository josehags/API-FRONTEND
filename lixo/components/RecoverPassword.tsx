import { Button, Form, Input, Layout, Typography } from 'antd';
import './css/RecoverPassword.css';

const RecoverPassword: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="container">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login"
      >
        <Typography.Title level={3} className="page-header" underline>
          SISTEMA
        </Typography.Title>
        <Form.Item
          label="Senha"
          name="password"
          rules={[
            {
              required: true,
              message: 'Por favor, insira seu email de acesso ao sistema!',
            },
          ]}
        >
          <Input.Password placeholder="Informe a nova senha para o usuário" />
        </Form.Item>

        <Form.Item
          label="Confirme a Senha"
          name="confirmPassword"
          rules={[{ required: true, message: 'Por favor, informe sua senha!' }]}
        >
          <Input.Password placeholder="Confirme sua nova senha" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 17 }}>
          <Button className="botao" type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default RecoverPassword;
