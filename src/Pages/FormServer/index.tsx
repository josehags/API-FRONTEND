import { Form, Button, Input } from 'antd';
import { useState } from 'react';
import ModalServer from '../../Components/ModalServer';

export default function FormServer() {
  const [openModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        form.setFieldValue('rua', data.logradouro);
        form.setFieldValue('bairro', data.bairro);
        form.setFieldValue('cidade', data.localidade);
        form.setFieldValue('estado', data.uf);
        form.setFieldValue('addressNumber', '');
      });
  };

  return (
    <>
      <Form form={form}>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: 'right', width: 'auto' }}
            onClick={() => {
              setOpenModal(true);
            }}
          >
            Criar servidor
          </Button>
        </Form.Item>

        <Form.Item label="CEP" name={['cep']}>
          <Input type="text" onBlur={checkCEP} />
        </Form.Item>
        <Form.Item label="Rua" name={['rua']}>
          <Input />
        </Form.Item>
        <Form.Item label="Bairro" name={['bairro']}>
          <Input />
        </Form.Item>
        <Form.Item label="Cidade" name={['cidade']}>
          <Input />
        </Form.Item>
        <Form.Item label="Estado" name={['estado']}>
          <Input />
        </Form.Item>
      </Form>
      <Form></Form>
      <ModalServer openModal={openModal} />
    </>
  );
}
