import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postUser, updateUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
  image: string;
}

type Propos = {
  id: string;
  openModal: boolean;
  editUser: IUser;
  form: any;
  closeModal: (open: boolean) => void;
};

const ModalUser = ({ id, openModal, form, closeModal, editUser }: Propos) => {
  const { user, startModal } = useProfileUser();
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }

  const handle = async () => {
    setEditingUser(editUser);
    editingUser && editingUser.id
      ? setUsers((pre: any) => {
          return pre.map((user: any) => {
            if (user.id === editingUser?.id) {
              console.log('oi ', editingUser);
              return editingUser;
            } else {
              closeModal(false);
              return user;
            }
          });
        })
      : submitCreate;

    console.log('clique  no modal!', editingUser);

    // editingUser && editingUser.id ? submitUpadate : submitCreate;
  };

  //************************************** */
  //ATUALIZAÇÃO DE USUARIOS************

  const submitUpadate = async () => {
    if (editingUser?.email !== undefined && editingUser.name !== null) {
      await updateUser(
        editingUser?.name,
        editingUser?.email,
        editingUser?.role,
        editingUser?.sector,
        editingUser?.image,
        editingUser?.id,
        startModal,
      );

      startModal('success', 'Usuário atualizado com sucesso!');
      closeModal(false);
    }
  };
  //****************** */
  // CRIAÇÃO DE USUARIOS

  const submitCreate = async () => {
    if (editingUser?.email !== undefined && editingUser.name !== null) {
      await postUser(
        editingUser?.name,
        editingUser?.email,
        editingUser?.role,
        editingUser?.sector,
        editingUser?.image,
        startModal,
      );
    }

    closeModal(false);
    return undefined;
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
            key="submit"
            type="primary"
            className="button-delete-create"
            onClick={() => closeModal(false)}
          >
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            className="button-save-create"
            onClick={() => {
              handle();
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
                    message: 'Por favor, insira seu E-mail',
                  },
                ]}
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

// onClick={() => {
//   editingUser && editingUser.id
//     ? setUsers((pre: any) => {
//         return pre.map((user: any) => {
//           if (user.id === editingUser?.id) {
//             console.log(editingUser);
//             return submitUpadate;
//           } else {
//             closeModal(false);
//             return user;
//           }
//         });
//       })
//     : submitCreate;
// }}
