import React, { useState, useEffect, useRef } from 'react';
import { Input, Form, InputRef, Button, Space, Dropdown } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { DownOutlined } from '@ant-design/icons';

import type { ColumnsType, ColumnType } from 'antd/es/table';
import Highlighter from 'react-highlight-words';
import { Table } from 'antd';
import { getUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { Navigate, useHref, useNavigate } from 'react-router-dom';
import { APIUsers } from '../../Services/Axios/baseService';
import PersonalData from '../../Components/PersonalData';
import UserUpdate from '../../Pages/UserUpdate';
import { FilterConfirmProps } from 'antd/lib/table/interface';

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

  const items = [
    {
      key: '1',
      label: 'Alterar',
      a: <a href="/update">...</a>,
    },
    {
      key: '2',
      label: 'Desativar',
    },
  ];
if ('1' == )
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
      title: 'Name',
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',

      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Sector',
      dataIndex: 'sector',
      key: 'sector',
      sorter: (a, b) => a.sector.length - b.sector.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ação',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Space size="middle">
          <Dropdown menu={{ items }}>
            <a>
              Mais <DownOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
      // => <a href="/atualizar">Alterar</a>,
    },
  ];

  //as duas formas dão certo
  // useEffect(() => {
  //   const loading = async () => {
  //     const response = await APIUsers.get('usuarios');
  //     console.log(response.data);
  //     setUsers(response.data);
  //   };
  //   loading();
  // }, []);

  const getUsers = async () => {
    const response = await APIUsers.get('usuarios');
    setUsers(response.data);
  };

  // const getUsers = async () => {
  //   await getUser('usuarios', startModal)
  //     .then(response => setUsers(response.data))
  //     .catch(err => {
  //       console.error(
  //         `An unexpected error ocourred while getting users. ${err}`,
  //       );
  //     });
  // };

  useEffect(() => {
    getUsers();
  }, [user, _newUser]);

  // useEffect(() => {
  //   setFilterUsers(
  //     users.filter(User =>
  //       User.name.toLowerCase().includes(User?.toLowerCase()),
  //     ),
  //   );
  // }, [word]);

  useEffect(() => {
    setFilterUsers(users);
  }, [users]);

  // const listUsers = () => {
  //   if (users?.length === 0) {
  //     return <h1>Sem resultados</h1>;
  //   }
  //   if (filterUsers?.length === 0) {
  //     return <h1>Sem resultados</h1>;
  //   }
  // return filterUsers?.map(User => (
  //   <PersonalData user={User} key={User._id} getUsers={getUsers} />
  // ));
  // };

  if (!localStorage.getItem('@App:token')) {
    navigate('/login', { replace: true });
  }

  return (
    <>
      {/* {user ? (
        <>
          {user.role === 'admin' ? ( */}
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

      {/* ) : (
            navigate('//nao-autorizado', { replace: true }) */}
      {/* )}
        </>
      ) : (
        <h1>Carregando...</h1>
      )} */}
    </>
  );
};

export default FormUser;
