import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../Services/Axios/userServices';
import { useProfileUser } from '../../Context';

const UserUpdate = () => {
  const { user, startModal } = useProfileUser();
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputRole, setInputRole] = useState('');
  const [inputSector, setInputSector] = useState('');
  const [inputSectorID, setInputSectorID] = useState('');
  const [inputRegisterUserImage, setRegisterUserInputImage] = useState('');
  const [baseImage, setBaseImage] = useState('');
  const [sectors, setSectors] = useState([]);
  const { id } = useParams();

  // const getSectorFromApi = async sectorID => {
  //   await getSector(`sector/${sectorID}`, startModal).then(response =>
  //     setInputSector(response?.data?.name),
  //   );
  // };

  // const getUserFromApi = async () => {
  //   await getUser(`users/${id}`, startModal).then(response => {
  //     const { data } = response;
  //     setInputName(data.name);
  //     setInputEmail(data.email);
  //     setInputRole(data.role);
  //     setInputSectorID(data.sector);
  //     setRegisterUserInputImage(data.image);
  //     getSectorFromApi(data.sector);
  //   });
  // };

  // useEffect(() => {
  //   getUserFromApi();
  // }, []);

  // useEffect(() => {
  //   setInputSectorID(sectors?.find(sector => sector.name === inputSector)?._id);
  // }, [inputSector]);

  // const submit = async () => {
  //   if (validateSignUp(inputEmail, inputName)) {
  //     await updateUser(
  //       inputName,
  //       inputEmail,
  //       inputRole,
  //       inputSectorID,
  //       baseImage,
  //       id,
  //       startModal,
  //     );
  //     startModal('Usuário atualizado com sucesso!');
  //     // return history.push('/usuarios');
  //   }
  //   startModal(
  //     "Nome deve ser completo, sem números. Email deve conter o formato 'nome@email.com'. Senha deve conter no minimo 6 caracteres. As senhas devem ser iguais!",
  //   );
  //   return undefined;
  // };

  // const cancel = () => history.push('/usuarios');

  if (!localStorage.getItem('@App:token')) {
    console.log('oi');
  }
  return (
    // <>
    //   {user ? (
    //     <>
    //       {user.role === 'admin' ? (
    //         <GenericRegisterScreen
    //           sidebarList={[inputName, inputEmail, inputRole, inputSector]}
    //           cancel={cancel}
    //           submit={submit}
    //           buttonTitle="Atualizar"
    //           inputImage={inputRegisterUserImage}
    //           setInputImage={setRegisterUserInputImage}
    //           baseImage={baseImage}
    //           setBaseImage={setBaseImage}
    //         >
    //           <UserForms
    //             setInputName={setInputName}
    //             inputName={inputName}
    //             setInputEmail={setInputEmail}
    //             inputEmail={inputEmail}
    //             setInputRole={setInputRole}
    //             inputRole={inputRole}
    //             sectors={sectors}
    //             setSectors={setSectors}
    //             setInputSector={setInputSector}
    //             inputSector={inputSector}
    //           />
    //         </GenericRegisterScreen>
    //       ) : (
    //         <Redirect to="/nao-autorizado" />
    //       )}
    //     </>
    //   ) : (
    <h1>Carregando...</h1>
  );
  //   </>
  // );
};

export default UserUpdate;
