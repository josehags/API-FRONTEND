import { Form, Button, Input } from 'antd';
import { useState } from 'react';
import ModalServer from '../../Components/ModalServer';
import { BAseUrlCep } from '../../Constants/baseUrl';

export default function FormServer() {
  const [showModal, setShowModal] = useState(false);
  const { Search } = Input;

  const [form] = Form.useForm();

  const onSearch = (value: string) => {
    fetch(`https://viacep.com.br/ws/${value}/json/`)
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
  const hideModal = (refresh: boolean) => {
    setShowModal(false);
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
              setShowModal(true);
            }}
          >
            Criar servidor
          </Button>
        </Form.Item>

        <Form.Item label="CEP" name={['cep']}>
          <Search onSearch={onSearch} />
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
      <ModalServer openModal={showModal} closeModal={hideModal} />
    </>
  );
}
