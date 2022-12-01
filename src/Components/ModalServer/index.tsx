import { Modal, Space } from 'antd';
import { Button, Form, Input } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

require('./index.css');

type Propos = {
  openModal: boolean;
};

const ModalServer = ({ openModal }: Propos) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form:', values);
  };

  return (
    <Modal className="ant-modal" title="Servidores" open={openModal} footer>
      <Form
        form={form}
        name="dynamic_form_complex"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="sights">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area ||
                      prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item label="CEP" name={['CEP']}>
                        <Input />
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item label="Estado" name={['Estado']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Logradouro" name={['Logradouro']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Logradouro" name={['Logradouro']}>
                    <Input />
                  </Form.Item>

                  <DeleteOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Adicionar endereço
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
