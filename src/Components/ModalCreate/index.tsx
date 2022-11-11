import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { validateSignUp } from '../../Utils/validations';
import { postUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { APIUsers } from '../../Services/Axios/baseService';

require('./style.css');

const ModalCreate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [inputName, setName] = useState('');
  const [inputEmail, setEmail] = useState('');
  const [inputRole, setRole] = useState('');
  const [inputSector, setSector] = useState('');
  const { user, startModal } = useProfileUser();
  const [baseImage, setBaseImage] = useState('');

  const navigate = useNavigate();

  const submit = async () => {
    if (validateSignUp(inputEmail, inputName)) {
      await postUser(
        inputName,
        inputEmail,
        inputRole,
        inputSector,
        baseImage,
        startModal,
      );
      return navigate('/usuarios', { replace: true });
    }
    startModal(
      "Nome deve ser completo, sem números e o email deve conter o formato 'nome@email.com'.",
    );
    return undefined;
  };

  const showModal = () => {
    setOpen(true);
  };

  function handleFinish(a: any) {
    console.log(a);
  }

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const cancel = () => {
    setName('');
    setEmail('');
    setRole('');
    setSector('');
  };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Button className="button-criar" type="primary" onClick={showModal}>
        Criar Usuário
      </Button>
      <Modal
        open={open}
        title="Criar novo usuário"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Cancelar
          </Button>,
          <Button key="link" type="primary" onClick={submit}>
            Salvar
          </Button>,
        ]}
      >
        <>
          <Form layout="vertical" onFinish={handleFinish}>
            <Col offset={1} span={16}>
              <Form.Item name={['fullname']} label="Nome">
                <Input
                  value={inputName}
                  placeholder="Digite o seu nome"
                  onChange={e => setName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['email']} label="Email">
                <Input
                  value={inputEmail}
                  placeholder="Digite o seu email"
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['role']} label="Função">
                <Input
                  value={inputRole}
                  placeholder="Digite a sua função"
                  onChange={e => setRole(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['sector']} label="Setor">
                <Input
                  value={inputSector}
                  placeholder="Digite o seu setor"
                  onChange={e => setSector(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default ModalCreate;
