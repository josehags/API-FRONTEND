import { Form, Button } from 'antd';
import { useState } from 'react';
import ModalServer from '../../Components/ModalServer';

export default function FormServer() {
  const [showModal, setShowModal] = useState(false);

  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
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

      <ModalServer openModal={showModal} closeModal={hideModal} />
    </>
  );
}
