import React, { useState, useEffect, useRef } from 'react';
import {
  Input,
  Form,
  InputRef,
  Button,
  Space,
  Dropdown,
  Popconfirm,
  Modal,
  Col,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { Table } from 'antd';
import {
  deleteUser,
  getUser,
  updateUser,
} from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { useNavigate, useParams } from 'react-router-dom';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import ModalCreate from '../../Components/ModalCreate';
import { validateSignUp } from '../../Utils/validations';
require('./index.css');
interface DataType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
  image: string;
}

type DataIndex = keyof DataType;

const FormUser = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { user, startModal } = useProfileUser();
  const [inputName, setName] = useState('');
  const [inputEmail, setEmail] = useState('');
  const [inputRole, setRole] = useState('');
  const [inputSector, setSector] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const { id } = useParams();

  const [recordUser, setRecordUser] = useState<{
    record: any;
    rowIndex: any;
  }>();

  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<DataType | null>(null);

  const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }

  // ******************************

  // LISTAGEM DE USUARIOS**************
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex,
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Função',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Setor',
      dataIndex: 'sector',
      key: 'sector',
      width: '20%',
      sorter: (a, b) => a.sector.length - b.sector.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ação',

      key: 'operation',
      render: (record: any) => {
        return (
          <Space size="middle">
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <>
                        <a
                          onClick={() => {
                            onEditUser(record);
                          }}
                        >
                          Alterar
                        </a>
                      </>
                    ),
                    key: '1',
                  },
                  {
                    label: (
                      <Popconfirm
                        title="Tem certeza de que deseja desabilitar este registro de usuário ?"
                        onConfirm={() => ClickDeleteUser(record.id)}
                      >
                        <a>Excluir</a>
                      </Popconfirm>
                    ),
                    key: '2',
                  },
                ],
              }}
            >
              <a onClick={e => e.preventDefault()} className="option">
                <Space style={{ background: 'red' }}>
                  Mais
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    loadingUser();
  }, []);

  async function loadingUser() {
    const response = await getUser('usuarios', startModal);
    if (response !== false) {
      setUsers(response.data);
    } else {
      startModal('error', 'Ocorreu um erro inesperado ao obter usuários.');
    }
  }

  // exclusão de usuario
  const ClickDeleteUser = async (record: any) => {
    await deleteUser(record, startModal);
    const novosUsuarios = [...users];
    novosUsuarios.splice(recordUser?.rowIndex, 1);
    setUsers(novosUsuarios);
  };

  //************************************** */
  //ATUALIZAÇÃO DE USUARIOS************

  const onEditUser = (record: any) => {
    setIsEditing(true);
    setEditingUser(record);
    //retorna o obejto
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

  const submit = async () => {
    if (editingUser?.email !== undefined && editingUser.name !== null) {
      if (validateSignUp(editingUser?.email, editingUser?.name)) {
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
        navigate('/usuarios');
      }
      startModal(
        "Nome deve ser completo, sem números. Email deve conter o formato 'nome@email.com'. Senha deve conter no minimo 6 caracteres. As senhas devem ser iguais!",
      );
    }
  };

  const handleOk = () => {
    setOpen(false);
  };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Form className="layout" layout="vertical" onFinish={handleFinish}>
        {/*  */}
        <Form.Item>
          <ModalCreate />
        </Form.Item>

        <Table
          columns={columns}
          expandable={{
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          onRow={(record: any, rowIndex: any) => {
            return {
              onClick: event => {
                setRecordUser({ record, rowIndex });
              }, // click row
            };
          }}
          dataSource={users}
        />

        {/* MODAL DE ATUALIZAÇÃO DE USUÁRIO */}

        <Modal
          open={open}
          title="Editar usuário"
          style={{}}
          className="form-modal"
          centered
          visible={isEditing}
          onOk={handleOk}
          onCancel={() => {
            resetEditing();
          }}
          footer={[
            <Button
              key="submit"
              type="primary"
              className="button-delete"
              onClick={() => resetEditing()}
            >
              Cancelar
            </Button>,
            <Button
              key="submit"
              type="primary"
              className="button-save"
              onClick={() => {
                editingUser && editingUser.id
                  ? setUsers((pre: any) => {
                      return pre.map((user: any) => {
                        if (user.id === editingUser?.id) {
                          console.log(editingUser);
                          return editingUser;
                        } else {
                          resetEditing();
                          return user;
                        }
                      });
                    })
                  : console.log('teste');
              }}
            >
              Salvar
            </Button>,
          ]}
        >
          <label>Nome</label>
          <Input
            value={editingUser?.name}
            onChange={e => {
              setEditingUser((pre: any) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <p></p>
          <label>Email</label>
          <Input
            value={editingUser?.email}
            onChange={e => {
              setEditingUser((pre: any) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <p></p>
          <label>Role</label>
          <Input
            value={editingUser?.role}
            onChange={e => {
              setEditingUser((pre: any) => {
                return { ...pre, role: e.target.value };
              });
            }}
          />

          {/* <Form.Item name={['sector']} label="Setor">
            <Input
              value={editingUser?.sector}
              placeholder="Digite o seu setor"
              onChange={e => setSector(e.target.value)}
            />
          </Form.Item> */}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
        </Modal>
      </Form>
    </>
  );
};

export default FormUser;
