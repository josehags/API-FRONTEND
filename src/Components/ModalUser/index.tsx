import { Modal } from 'antd';
import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { postUser, updateUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';

interface IUser {
  key: React.Key;
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
  edit: string | null;
  closeModal: (open: boolean) => void;
};

const ModalUser = ({ id, openModal, closeModal, edit }: Propos) => {
  const { user, startModal } = useProfileUser();
  const [users, setUsers] = useState([]);

  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }

  // const userEdit = JSON.parse(String(sessionStorage.getItem('')));
  // console.log('índice', userEdit.rowIndex);
  // console.log('objeto', userEdit.record);
  const handle = async () => {
    const userEdit = JSON.parse(String(sessionStorage.getItem('@userEdit')));
    console.log('clique modal', editingUser);
    setEditingUser(userEdit.record);
    editingUser && editingUser.id ? submitUpadate : submitCreate;
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
  // useEffect(() => {
  //   handle();
  // }, []);

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
          <Form layout="vertical" onFinish={handleFinish}>
            <Col offset={1} span={16}>
              <Form.Item name={['name']} label="Nome">
                {' '}
                <Input
                  title="name"
                  className="input-"
                  value={editingUser?.name}
                  placeholder="Digite o seu nome"
                  onChange={e => {
                    setEditingUser((pre: any) => {
                      return { ...pre, name: e.target.value };
                    });
                  }}
                />
              </Form.Item>
            </Col>{' '}
            <Col offset={1} span={16}>
              <Form.Item name={['email']} label="E-mail">
                {' '}
                <Input
                  value={editingUser?.email}
                  placeholder="Digite o seu email"
                  onChange={e => {
                    setEditingUser((pre: any) => {
                      return { ...pre, email: e.target.value };
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['role']} label="Função">
                {' '}
                <Input
                  value={editingUser?.role}
                  placeholder="Digite a sua função"
                  onChange={e => {
                    setEditingUser((pre: any) => {
                      return { ...pre, role: e.target.value };
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['sector']} label="Setor">
                {' '}
                <Input
                  value={editingUser?.sector}
                  placeholder="Digite o seu setor"
                  onChange={e => {
                    setEditingUser((pre: any) => {
                      return { ...pre, sector: e.target.value };
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col offset={1} span={16}>
              <Form.Item name={['image']} label="image">
                {' '}
                <Input
                  value={editingUser?.image}
                  placeholder="Coloque sua foto"
                  onChange={e => {
                    setEditingUser((pre: any) => {
                      return { ...pre, image: e.target.value };
                    });
                  }}
                />
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
