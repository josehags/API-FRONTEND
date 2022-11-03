export {}; // import React, { ReactNode, useState } from 'react';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getUser } from '../../Services/Axios/userServices';
// import { useProfileUser } from '../../Context';
// import { TableHeader, P, Bar, TableTitle } from '../../Pages/ListUser/Style';
// import GenericListScreen from '../../Components/GenericListScreen';
// // import PersonalData from '../../Components/PersonalData';
// import { FunctionComponent } from 'react';

// interface Props {
//   children?: ReactNode;
// }

// const ListUser: FunctionComponent<Props> = ({ children }) => {
//   const { user, startModal } = useProfileUser();
//   const [word, setWord] = useState();
//   const [filterUsers, setFilterUsers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const navigate = useNavigate();

//   const getUsers = async () => {
//     await getUser('users', startModal)
//       .then(response => setUsers(response.valueOf.bind))
//       .catch(err => {
//         console.error(
//           `An unexpected error ocourred while getting users. ${err}`,
//         );
//       });
//   };

//   useEffect(() => {
//     getUsers();
//   }, [user]);

//   // useEffect(() => {
//   //   setFilterUsers(users.filter(user(word)));
//   // }, [word]);

//   useEffect(() => {
//     setFilterUsers(users);
//   }, [users]);

//   const listUsers = () => {
//     if (users?.length === 0) {
//       return <h1>Sem resultados</h1>;
//     }
//     if (filterUsers?.length === 0) {
//       return <h1>Sem resultados</h1>;
//     }
//     //   return filterUsers?.map(User => (
//     //     <PersonalData user={User} key={User} getUsers={getUsers} />
//     //   ));
//   };

//   if (!localStorage.getItem('@App:token')) {
//     return navigate('/login', { replace: true });
//   }
//   return (
//     <>
//       {user ? (
//         <>
//           {user.role === 'admin' ? (
//             <GenericListScreen
//               ButtonTitle="Novo Usuário"
//               PageTitle="Usuários"
//               SearchWord={word}
//               setWord={setWord}
//               ListType={listUsers()}
//               redirectTo="/cadastro"
//               clientList={undefined}
//               ButtonFunction={undefined}
//             >
//               <TableHeader>
//                 <TableTitle>
//                   <P>Nome</P>
//                 </TableTitle>
//                 <Bar />
//                 <TableTitle>
//                   <P>Email</P>
//                 </TableTitle>
//                 <Bar />

//                 <TableTitle>
//                   <P>Cargo</P>
//                 </TableTitle>
//                 <Bar />

//                 <TableTitle>
//                   <P>Setor</P>
//                 </TableTitle>
//                 <Bar />
//                 <TableTitle>
//                   <P>Ult. Atualização</P>
//                 </TableTitle>
//               </TableHeader>
//               <div style={{ display: 'none' }} />
//             </GenericListScreen>
//           ) : (
//             navigate('//nao-autorizado', { replace: true })
//           )}
//         </>
//       ) : (
//         <h1>Carregando...</h1>
//       )}
//       {children}
//     </>
//   );
// };

// export default ListUser;
