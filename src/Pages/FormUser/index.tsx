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
import { deleteUser, getUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';
import type { MenuProps } from 'antd';
import ModalUpdate from '../../Components/ModalUpdate';
import ModalCreate from '../../Components/ModalCreate';
import { preProcessFile } from 'typescript';

interface DataType {
  key: React.Key;
  id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
}

// type IUser = {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
//   sector: string;
// };
type DataIndex = keyof DataType;

const FormUser = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { user, startModal } = useProfileUser();
  const [inputName, setName] = useState('');
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const [record, setRecord] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState<DataType | null>(null);

  const navigate = useNavigate();

  const ClickDeleteUser = async (id: any, index: any) => {
    await deleteUser(record, startModal);
    console.log(record);
    const novosUsuarios = [...users];
    novosUsuarios.splice(index, 1);
    setUsers(novosUsuarios);
  };

  const items: MenuProps['items'] = [
    {
      // label: <ModalUpdate />,
      label: (
        <a
          onClick={() => {
            onEditUsuarios(record);
          }}
        >
          Alterar
        </a>
      ),
      key: '1',
    },
    {
      label: (
        <Popconfirm
          title="Are you sure, you want to disable this user record ?"
          onConfirm={() => ClickDeleteUser(user?.id, indexedDB)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
      key: '2',
    },
  ];

  function handleFinish(a: any) {
    console.log(a);
  }
  //ATUALIZAÇÃO DE USUARIOS************

  const onEditUsuarios = (record: any) => {
    setIsEditing(true);
    setEditingUser({ ...record });
    console.log(record);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(null);
  };

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
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <Space size="middle">
          <Dropdown menu={{ items }}>
            <a onClick={e => e.preventDefault()}>
              <Space>
                Mais
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const loading = async () => {
      const response = await getUser('usuarios', startModal);
      if (response !== false) {
        setUsers(response.data);
      } else {
        startModal('error', 'Ocorreu um erro inesperado ao obter usuários.');
      }
    };
    loading();
  }, []);

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }
  const handleOk = () => {
    setOpen(false);
  };
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
          onRow={(record: any, rowIndex) => {
            return {
              onClick: event => {
                setRecord(record);
              }, // click row
            };
          }}
          dataSource={users}
        />

        {/* MODAL DE ATUALIZAÇÃO DE USUÁRIO */}

        <Modal
          open={open}
          title="Editar usuário"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setUsers((pre: any) => {
              return pre.map((user: any) => {
                if (user.id === editingUser?.id) {
                  return editingUser;
                } else {
                  return user;
                }
              });
            });
            resetEditing();
          }}
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
          <p></p>
          <label>Sector</label>
          <Input
            value={editingUser?.sector}
            onChange={e => {
              setEditingUser((pre: any) => {
                return { ...pre, sector: e.target.value };
              });
            }}
          />
        </Modal>
      </Form>
    </>
  );
};

export default FormUser;
