import React, { useState, useEffect, useRef } from 'react';
import { Input, Form, InputRef, Button, Space, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import { Table } from 'antd';
import { getUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { useNavigate, useParams } from 'react-router-dom';
import { APIUsers } from '../../Services/Axios/baseService';
import UserUpdate from '../../Pages/UserUpdate';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';

require('./style.css');

interface DataType {
  key: React.Key;
  // id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
}
type DataIndex = keyof DataType;

const FormUser = (_newUser: any) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { user, startModal } = useProfileUser();
  const [word, setWord] = useState();
  const [filterUsers, setFilterUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  //const { id } = useParams();

  const items = [
    {
      key: '1',
      label: <a href={`/usuarios/editar/${user?.id}`}>Alterar</a>,
    },
    {
      key: '2',
      label: 'Desativar',
    },
  ];

  function handleFinish(a: any) {
    console.log(a);
  }
  // litagem
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

      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Setor',
      dataIndex: 'sector',
      key: 'sector',
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
            <a>
              Mais <DownOutlined />
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
        alert('Ocorreu um erro inesperado ao obter usuários.');
      }
    };
    loading();
  }, []);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      <Form layout="vertical" onFinish={handleFinish}>
        <Table
          key={user?.id}
          columns={columns}
          expandable={{
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          dataSource={users}
        />
      </Form>
    </>
  );
};

export default FormUser;
