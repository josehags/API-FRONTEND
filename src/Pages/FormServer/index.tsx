import { Form, Button, Input } from 'antd';
import { useState } from 'react';
import ModalServer from '../../Components/ModalServer';
import { Modal, Space } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

export default function FormServer() {
  const [openModal, setOpenModal] = useState(false);

  const [form] = Form.useForm();

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    // console.log(cep);
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
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Form.List name="dados">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ name }) => (
                <Space
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item label="CEP" name={['cep']}>
                    <Input
                      type="text"
                      {...form.getFieldValue('cep')}
                      onBlur={checkCEP}
                    />
                  </Form.Item>

                  <Form.Item label="Cidade" name={['cidade']}>
                    <Input type="text" {...form.getFieldValue('cidade')} />
                  </Form.Item>
                  <Form.Item label="Estado" name={['estado']}>
                    <Input type="text" {...form.getFieldValue('estado')} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        {/*  */}
      </Form>

      <Form form={form}>
        <Form.Item label="CEP" name={['cep']}>
          <Input type="text" {...form.getFieldValue('cep')} onBlur={checkCEP} />
        </Form.Item>
        <Form.Item label="Rua" name={['rua']}>
          <Input type="text" {...form.getFieldValue('rua')} />
        </Form.Item>
        <Form.Item label="Bairro" name={['bairro']}>
          <Input type="text" {...form.getFieldValue('bairro')} />
        </Form.Item>
        <Form.Item label="Cidade" name={['cidade']}>
          <Input type="text" {...form.getFieldValue('cidade')} />
        </Form.Item>
        <Form.Item label="Estado" name={['estado']}>
          <Input type="text" {...form.getFieldValue('estado')} />
        </Form.Item>
        <button>Enviar</button>
      </Form>
      <Form>
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
      </Form>
      <ModalServer openModal={openModal} />
    </>
  );
}
