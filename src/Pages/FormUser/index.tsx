import React, { useState, useEffect, useRef } from 'react';
import {
  Input,
  Form,
  InputRef,
  Button,
  Space,
  Dropdown,
  Popconfirm,
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
import ModalUser from '../../Components/ModalUser';

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
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);

  const [recordUser, setRecordUser] = useState<{
    record: any;
    rowIndex: any;
  }>();

  const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }

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
        // console.log(record);
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
                            //(recordUser?.record);
                            console.log(
                              'clique do formulario',
                              recordUser?.record,
                            );
                            recordUser?.record;
                            setOpenModal(true);
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
                <Space>
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

  // const onEditStudent = (record: any) => {
  //   setEditing({ ...record });
  //   console.log(record);
  // };
  //listagem de usuarios na tabela
  useEffect(() => {
    loadingUser();
    setOpenModal(false);
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
  //fechar modal
  const closeModal = (open: boolean) => {
    setOpenModal(false);
  };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  const edit = sessionStorage.getItem('@userEdit');
  sessionStorage.setItem('@userEdit', JSON.stringify(recordUser));

  return (
    <>
      <Form className="layout" layout="vertical" onFinish={handleFinish}>
        <Form.Item className="form">
          <Button
            className="button-create"
            type="primary"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            <a>Criar novo usuário</a>
          </Button>
        </Form.Item>

        <Table
          className="form-table"
          columns={columns}
          expandable={{
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          onRow={(record: any, rowIndex: any) => {
            return {
              onClick: event => {
                setRecordUser({ record, rowIndex });
                // console.log(recordUser);
              }, // click row
            };
          }}
          dataSource={users}
        />
      </Form>
      <ModalUser
        id={recordUser?.record.id}
        openModal={openModal}
        closeModal={closeModal}
        edit={edit}
      />
    </>
  );
};

export default FormUser;
