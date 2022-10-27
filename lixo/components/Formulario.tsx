import { Input, Form, Row, Col, Button } from "antd";
import { useState } from "react";

export default function Formulario () {
  const [name, setName] = useState('');

  function handleFinish (a: any) {
    console.log(a)
  }

  return <>
    { name }
    <Form
      layout="vertical"
      onFinish={handleFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            name={['fullname']}
            label="Nome completo"
          >
            <Input 
            value={ name }
            onChange={ e => setName(e.target.value) }
            placeholder="Ex. Divisão de Inovação e Tecnologia"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={['email']}
            label="E-mail"
          >
            <Input placeholder="Ex. ditpcgo@policiacivil.go.gov.br" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={['password']}
            label="Senha"
          >
            <Input
              type="password"
              placeholder="Deve conter maiuscula/minuscula/numero/simbolo"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Button type="primary" htmlType="submit">
          Salvar usuário
        </Button>
      </Row>
    </Form>
  </>
}