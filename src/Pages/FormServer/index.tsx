import { Input, Form, Row, Col, Button } from 'antd';
import { useState } from 'react';

export default function FormServer() {
  const [name, setName] = useState('');
  const [mother, setMother] = useState('');
  const [yearsold, setYearsold] = useState('');

  function handleFinish(a: any) {
    console.log(a);
  }

  return (
    <>
      {/*    { name },{ mother }, { yearsold } */}
      <Form layout="vertical" onFinish={handleFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name={['fullname']} label="Nome completo">
              <Input value={name} onChange={e => setName(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={['mother']} label="Nome da Mãe">
              <Input value={mother} onChange={e => setMother(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={['yearsold']} label="Idade">
              <Input
                type="number"
                value={yearsold}
                onChange={e => setYearsold(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Salvar Servidor
          </Button>
        </Row>
      </Form>
    </>
  );
}
