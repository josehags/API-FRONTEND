import { Modal, Space } from 'antd';
import { Button, Form, Input } from 'antd';

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

require('./index.css');

type Propos = {
  openModal: boolean;
};

const ModalServer = ({ openModal }: Propos) => {
  const [form] = Form.useForm();
  const { Search } = Input;

  return (
    <Modal
      className="ant-modal"
      title="Servidores"
      width={1500}
      open={openModal}
      footer
    >
      <Form form={form}>
        <Form
          name="dynamic_form_nest_item"
          // onFinish={onFinish}
          autoComplete="off"
        >
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'first']}
                      rules={[
                        { required: true, message: 'Missing first name' },
                      ]}
                    >
                      <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'last']}
                      rules={[{ required: true, message: 'Missing last name' }]}
                    >
                      <Input placeholder="Last Name" />
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
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Form>
    </Modal>
  );
};

export default ModalServer;
