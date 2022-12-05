import { Modal, Space } from 'antd';
import { Button, Form, Input } from 'antd';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

require('./index.css');

type Propos = {
  openModal: boolean;
};

const ModalServer = ({ openModal }: Propos) => {
  const [form] = Form.useForm();

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res: { json: () => any }) => res.json())
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
    <Modal
      className="ant-modal"
      title="Servidores"
      width={1500}
      open={openModal}
      footer
    >
      <Form form={form}>
        <Form.List name={'endereço'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item label="CEP" name={[field.name, 'cep']}>
                    <Input onBlur={checkCEP} />
                  </Form.Item>
                  <Form.Item label="Rua" name={[field.name, 'rua']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Bairro" name={[field.name, 'bairro']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Cidade" name={[field.name, 'cidade']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Estado" name={[field.name, 'estado']}>
                    <Input />
                  </Form.Item>

                  <DeleteOutlined
                    style={{ color: 'red' }}
                    onClick={() => remove(field.name)}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default ModalServer;
