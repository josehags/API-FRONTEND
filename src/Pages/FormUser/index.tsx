import React, { useState, useEffect } from 'react';
import { Input, Form } from 'antd';

import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';
import { useNavigate } from 'react-router-dom';
import { APIUsers } from '../../Services/Axios/baseService';
import PersonalData from '../../Components/PersonalData';
import { isDataView } from 'util/types';
require('./style.css');

interface DataType {
  key: React.Key;
  // id: string;
  name: string;
  email: string;
  role: string;
  sector: string;
}

export default function FormUser() {
  const { user, startModal } = useProfileUser();
  const [word, setWord] = useState();
  const [filterUsers, setFilterUsers] = useState([]);
  const [users, setUsers] = useState([]);
  //const navigate = useNavigate();

  function handleFinish(a: any) {
    console.log(a);
  }
  // as duas formas dão certo
  // useEffect(() => {
  //   const loading = async () => {
  //     const response = await APIUsers.get('/usuarios');
  //     console.log(response.data);
  //     setUsers(response.data);
  //   };
  //   loading();
  // }, []);

  // const getUsers = async () => {
  //   const response = await APIUsers.get('usuarios', startModal);
  //   setUsers(response.data);
  // };

  const getUsers = async () => {
    await getUser('usuarios', startModal)
      .then(response => setUsers(response.data))
      .catch(err => {
        console.error(`Ocorreu um erro inesperado ao obter usuários. ${err}`);
      });
  };

  useEffect(() => {
    getUsers();
  }, [user]);

  // useEffect(() => {
  //   setFilterUsers(
  //     users.filter(User =>
  //       user?.name.toLowerCase().includes(word?.toLowerCase()),
  //     ),
  //   );
  // }, [word]);

  // useEffect(() => {
  //   setFilterUsers(users);
  // }, [users]);

  // const listUsers = () => {
  //   if (users?.length === 0) {
  //     return <h1>Sem resultados</h1>;
  //   }
  //   if (filterUsers?.length === 0) {
  //     return <h1>Sem resultados</h1>;
  //   }
  //   return filterUsers?.map(User => <PersonalData key={user?.id} />);
  // };

  // if (!localStorage.getItem('@App:token')) {
  //   navigate('/login', { replace: true });
  // }

  const columns: ColumnsType<DataType> = [
    { title: 'Nome', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Sector', dataIndex: 'sector', key: 'sector' },
    {
      title: 'Ação',
      dataIndex: '',
      key: 'x',
      render: () => <a href="/atualizar">Alterar</a>,
    },
  ];

  return (
    <>
      {/* {user ? (
        <>
          {user.role === 'admin' ? ( */}
      <Form layout="vertical" onFinish={handleFinish}>
        <Input className="pesquisa" placeholder="Pesquisa" />

        <Table
          key={user?.id}
          columns={columns}
          expandable={{
            rowExpandable: record => record.name !== 'Not Expandable',
          }}
          dataSource={users}

          //
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
}
