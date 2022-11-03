import { Input, Form, Row, Col, Button, Menu, Dropdown } from 'antd';
import { useState } from 'react';
import Page from '../../Components/Pagination';
require('./style.css');

export default function FormUser() {
  const [name, setName] = useState('');

  function handleFinish(a: any) {
    console.log(a);
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              Administrador
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              Usuário
            </a>
          ),
        },
        {
          key: '3',
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.luohanacademy.com"
            >
              Profissional
            </a>
          ),
        },
      ]}
    />
  );

  return (
    <>
      <Form layout="vertical" onFinish={handleFinish}>
        <Input className="pesquisa" placeholder="Pesquisa" />
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name={['fullname']} label="Nome completo">
              <Input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Nome Completo"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={['email']} label="E-mail">
              <Input placeholder="Ex. ditpcgo@policiacivil.go.gov.br" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={['credential']} label="Função">
              <Dropdown overlay={menu} placement="bottom">
                <Button>...</Button>
              </Dropdown>
            </Form.Item>
          </Col>
        </Row>

        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Salvar usuário
          </Button>
        </Row>
        <Form.Item className="page-form">
          <Page />
        </Form.Item>
      </Form>
    </>
  );
}
