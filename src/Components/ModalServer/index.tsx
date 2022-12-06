import { Modal, Space } from 'antd';
import { Button, Form, Input } from 'antd';
import { Select } from 'antd';
import { useListCidEst } from '../../hooks/useListCidEst';

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

require('./index.css');

type Propos = {
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalServer = ({ openModal, closeModal }: Propos) => {
  const [form] = Form.useForm();
  const { estados } = useListCidEst();

  const { Search } = Input;

  const onSearch = (value: string) => {
    fetch(`https://viacep.com.br/ws/${value}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log('consulta API', data);
        form.setFieldValue('rua', data.logradouro);
        form.setFieldValue('bairro', data.bairro);
        form.setFieldValue('cidade', data.localidade);
        form.setFieldValue('estado', data.uf);
        form.setFieldValue('addressNumber', '');
      });
  };

  return (
    <Modal
      className="ant-modal-server"
      title="Servidores"
      open={openModal}
      width={1500}
      forceRender
      okText="Salvar"
      onCancel={() => {
        closeModal(false);
      }}
    >
      <Form form={form}>
        <Form.List name={'endereço'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space align="baseline">
                  <Form.Item label="CEP" name={[field.name, 'cep']}>
                    <Search onSearch={onSearch} />
                  </Form.Item>
                  <Form.Item label="Rua" name={[field.name, 'rua']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Bairro" name={[field.name, 'bairro']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Estado" name={[field.name, 'estado']}>
                    <Select
                      options={estados.map(estados => ({
                        label: estados.nome,
                        value: estados.nome,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item label="Cidade" name={[field.name, 'cidade']}>
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
