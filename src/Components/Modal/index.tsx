import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [sector, setSector] = useState('');
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  function handleFinish(a: any) {
    console.log(a);
  }

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      <a type="primary" onClick={showModal}>
        {' '}
        Alterar
      </a>
      <Modal
        open={open}
        title="Atualizar Usuário..."
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Cancelar
          </Button>,
          <Button
            key="link"
            href="https://google.com"
            type="primary"
            onClick={handleOk}
          >
            Salvar
          </Button>,
        ]}
      >
        <>
          <Form layout="vertical" onFinish={handleFinish}>
            <Col offset={1} span={16}>
              <Form.Item name={['fullname']} label="Nome">
                <Input
                  value={name}
                  placeholder="Digite o seu nome"
                  onChange={e => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['email']} label="Email">
                <Input
                  value={email}
                  placeholder="Digite o seu email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['role']} label="Função">
                <Input
                  value={role}
                  placeholder="Digite a sua função"
                  onChange={e => setRole(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['sector']} label="Setor">
                <Input
                  value={sector}
                  placeholder="Digite o seu setor"
                  onChange={e => setSector(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default App;
