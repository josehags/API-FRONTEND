import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useProfileUser } from '../../src/Context';

interface DataType {
  key: React.Key;
  // id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
}

type DataIndex = keyof DataType;

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     email: 'jbbrown@gmail.com',
//     role: 'New York No. 1 Lake Park',
//     sector: 'teste',
//   },
//   {
//     key: '1',
//     name: 'John Brown',
//     email: 'jbbrown@gmail.com',
//     role: 'New York No. 1 Lake Park',
//     sector: 'teste',
//   },
//   {
//     key: '1',
//     name: 'John Brown',
//     email: 'jbbrown@gmail.com',
//     role: 'New York No. 1 Lake Park',
//     sector: 'teste',
//   },
//   {
//     key: '1',
//     name: 'John Brown',
//     email: 'jbbrown@gmail.com',
//     role: 'New York No. 1 Lake Park',
//     sector: 'teste',
//   },
// ];

const App: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [users, setUsers] = useState([]);
  const { user, startModal } = useProfileUser();

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
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
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
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',
      ...getColumnSearchProps('email'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      ...getColumnSearchProps('role'),
      sorter: (a, b) => a.role.length - b.role.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ação',
      dataIndex: '',
      key: 'x',
      render: () => <a href="/atualizar">Alterar</a>,
    },
  ];

  return (
    <Table
      key={user?.id}
      columns={columns}
      expandable={{
        rowExpandable: record => record.name !== 'Not Expandable',
      }}
      dataSource={users}
    />
  );
};

export default App;
