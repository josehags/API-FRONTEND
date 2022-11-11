import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { validateSignUp } from '../../Utils/validations';

const ModalUpdate: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [inputName, setName] = useState('');
  const [inputEmail, setEmail] = useState('');
  const [inputRole, setRole] = useState('');
  const [inputSector, setSector] = useState('');
  const [baseImage, setBaseImage] = useState('');

  const { user, startModal } = useProfileUser();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getUsuario = async () => {
      const response = await getUser(`usuarios/${id}`, startModal);
      // console.log(response);
      if (response) {
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setSector(response.data.sector);
      }
    };
    getUsuario();
  }, []);

  const submit = async () => {
    if (validateSignUp(inputEmail, inputName)) {
      await updateUser(
        inputName,
        inputEmail,
        inputRole,
        inputSector,
        //baseImage,
        id,
        startModal,
      );
      startModal('Usuário atualizado com sucesso!');
      navigate('/usuarios');
    }
    startModal(
      "Nome deve ser completo, sem números. Email deve conter o formato 'nome@email.com'. Senha deve conter no minimo 6 caracteres. As senhas devem ser iguais!",
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

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      <a type="primary" onClick={showModal}>
        {' '}
        Alterar
      </a>
      <Modal
        open={open}
        title="Atualizar Usuário..."
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

export default ModalUpdate;
