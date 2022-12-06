import { Modal, Form, Input, Col } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUser,
  postUser,
  updateUser,
} from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';

require('./index.css');

type Props = {
  id: string;
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

const ModalUser = ({ id, openModal, closeModal }: Props) => {
  const { startModal } = useProfileUser();
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const handleOk = (e: any) => {
    e.preventDefault();
    form
      .validateFields()
      .then(() => {
        if (id) {
          submitUpdate();
        } else {
          submitCreate();
        }
        form.resetFields();
        closeModal(true);
      })
      .catch(errorInfo =>
        startModal('error', 'Erro no preenchimento dos campos.'),
      );
  };

  //Listagem se tiver id set no formulário
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

  //ATUALIZAÇÃO DE USUARIOS************
  const submitUpdate = async () => {
    const editingUser = form.getFieldsValue(true);
    await updateUser(
      editingUser?.name,
      editingUser?.email,
      editingUser?.role,
      editingUser?.sector,
      editingUser?.image,
      id,
      startModal,
    );
    // startModal('success', 'Usuário atualizado com sucesso!');
  };

  // CRIAÇÃO DE USUARIOS
  const submitCreate = async () => {
    const editingUser = form.getFieldsValue(true);
    await postUser(
      editingUser?.name,
      editingUser?.email,
      editingUser?.role,
      editingUser?.sector,
      editingUser?.image,
      startModal,
    );
  };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Modal
        open={openModal}
        title="Usuários"
        okText="Salvar"
        onCancel={() => {
          form.resetFields();
          closeModal(false);
        }}
        onOk={handleOk}
      >
        <Form layout="vertical" form={form}>
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
      </Modal>
    </>
  );
};
export default ModalUser;
