import { Form, Button } from 'antd';
import { useState } from 'react';
import ModalServer from '../../Components/ModalServer';

export default function FormServer() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
