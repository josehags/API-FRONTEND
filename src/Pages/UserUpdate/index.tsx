import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';

const UserUpdate: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [sector, setSector] = useState('');
  const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
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

        <Row>
          <Col span={23} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              type="primary"
              htmlType="submit"
            >
              Cancelar
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default UserUpdate;
