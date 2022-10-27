import { Button, Form, Input, Layout, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useProfileUser } from '../../Context';
require('./style.css');

const RecoverPasswordScreen: React.FC = () => {
  const { handlePassword } = useProfileUser();

  const onFinish = (values: any) => {
    handlePassword(values.email);
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
          <Space size={200}>
            <Button className="login-form-forgot" type="link" href="/">
              Voltar
            </Button>
            <Button className="botao" type="primary" htmlType="submit">
              Enviar
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default RecoverPasswordScreen;
