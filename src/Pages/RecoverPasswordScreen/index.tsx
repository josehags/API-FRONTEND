import { Button, Form, Input, Layout, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { toast, ToastContainer } from 'react-toastify';
require('./style.css');

const RecoverPasswordScreen: React.FC = () => {
  const notify = (email: any) => toast('Email enviado com sucesso!');

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout className="containerRecover">
      <Form
        name="basic"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="recoverScreen"
      >
        <Typography.Title level={3} className="page-header-recover" underline>
          RECUPERAR SENHA
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
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5 }}>
          <Space size={300}>
            <Button className="login-form-forgot" type="link" href="/login">
              Voltar
            </Button>
            <Button
              className="botao"
              type="primary"
              htmlType="submit"
              onClick={notify}
            >
              Enviar
            </Button>
            <ToastContainer />
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default RecoverPasswordScreen;
