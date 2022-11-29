import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  getUser,
  postUser,
  updateUser,
} from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';

// export interface IUser {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   sector: string;
//   image: string;
// }

type Propos = {
  id: string;
  openModal: boolean;

  closeModal: (open: boolean) => void;
};

const ModalUser = ({ id, openModal, closeModal }: Propos) => {
  const { user, startModal } = useProfileUser();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }
  useEffect(() => {
    loadingUser();
  }, [id]);

  async function loadingUser() {
    if (id) {
      await getUser(`usuarios/${id}`, startModal).then(response => {
        if (response !== false) {
          form.setFieldsValue({
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
            sector: response.data.sector,
            image: response.data.image,
          });
        } else {
          startModal('error', 'Ocorreu um erro inesperado ao obter usuários.');
        }
      });
    }
  }

  //************************************** */
  //ATUALIZAÇÃO DE USUARIOS************

  const submitUpadate = async () => {
    const editingUser = form.getFieldsValue(true);
    // console.log('obejto', editingUser);
    await updateUser(
      editingUser?.name,
      editingUser?.email,
      editingUser?.role,
      editingUser?.sector,
      editingUser?.image,
      id,
      startModal,
    );

    startModal('success', 'Usuário atualizado com sucesso!');
    closeModal(false);
  };
  //****************** */
  // CRIAÇÃO DE USUARIOS

  const submitCreate = async () => {
    const editingUser = form.getFieldsValue(true);
    console.log('novo usuario', editingUser);
    await postUser(
      editingUser?.name,
      editingUser?.email,
      editingUser?.role,
      editingUser?.sector,
      editingUser?.image,
      startModal,
    );
    closeModal(false);
    loadingUser();
    return undefined;
  };

  const onSubmit = async () => {
    if (id) {
      submitUpadate();
    } else {
      submitCreate();
    }
    closeModal(false);
  };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }
  return (
    <>
      <Modal
        open={openModal}
        title="Usuários"
        onCancel={() => {
          closeModal(false);
        }}
        footer={[
          <Button
            htmlType="submit"
            // key="submit"
            type="primary"
            className="button-delete-create"
            onClick={() => closeModal(false)}
          >
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            className="button-save-create"
            onClick={() => {
              onSubmit();
            }}
          >
            Salvar
          </Button>,
        ]}
      >
        <>
          <Form layout="vertical" onFinish={handleFinish} form={form}>
            <Col offset={1} span={16}>
              <Form.Item
                name={['name']}
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira seu nome',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item
                name={['email']}
                label="E-mail"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira seu e-mail',
                  },
                  {
                    type: 'email',
                    message: 'Por favor, informe um email válido!',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item
                name={['role']}
                label="Função"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a sua função',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item
                name={['sector']}
                label="Setor"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o seu setor',
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['image']} label="Imagem">
                <Input />
              </Form.Item>
            </Col>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default ModalUser;
