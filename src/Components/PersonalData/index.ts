import React, { useEffect, useState } from 'react';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { BsThreeDots, BsPencil } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import moment from 'moment-timezone';
import { deleteUser } from '../../Services/Axios/userServices';
import { getSector } from '../../Services/Axios/sectorServices';
import {
  PersonDataBox,
  TableContent,
  Box,
  Ul,
  Content,
  P,
  TableContainer,
  ImageUser,
  DotContent,
  Img,
} from './style';
import { Li, Button, Icon } from '../DataList/Style';
import { useProfileUser } from '../../Context';
import ConfirmDemandModal from '../ConfirmDemandModal';

const PersonalData = ({ user, getUsers }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [boxState, setBoxState] = useState(false);
  const [userSector, setUserSector] = useState([]);
  const { startModal } = useProfileUser();

  const renderImage = () => {
    if (!user.image) {
      return <IoPersonCircleOutline size="100%" />;
    }
    return <Img src={user.image} alt="Foto" />;
  };

  const getSectorFromAPI = id => {
    getSector(`sector/${id}`, startModal).then(response =>
      setUserSector(response.data),
    );
  };

  const closeBox = () => {
    if (boxState) {
      setBoxState(false);
    }
  };

  const ClickDeleteUser = () => {
    deleteUser(user._id, startModal);
    getUsers(startModal);
  };

  const translateRole = role => {
    const rolesDict = {
      admin: 'Administrador',
      professional: 'Profissional',
      receptionist: 'Recepcionista',
    };
    return rolesDict[role];
  };

  useEffect(() => {
    getSectorFromAPI(user.sector);
  }, []);

  return (
    <Content onMouseLeave={closeBox} onClick={closeBox}>
      <PersonDataBox>
        <ImageUser>{renderImage()}</ImageUser>
        <TableContainer>
          <TableContent width={20}>
            <P>{user.name}</P>
          </TableContent>

          <TableContent width={25}>
            <P>{user.email}</P>
          </TableContent>

          <TableContent width={20}>
            <P>{translateRole(user.role)}</P>
          </TableContent>

          <TableContent width={15}>
            <P>{userSector?.name}</P>
          </TableContent>

          <TableContent width={15}>
            <P>
              {moment
                .parseZone(user.updatedAt)
                .local(true)
                .format('DD/MM/YYYY')}
            </P>
          </TableContent>

          <DotContent width={2} justifycontent="flex-end">
            <P>
              <BsThreeDots
                onClick={() => {
                  setBoxState(!boxState);
                }}
              />
            </P>
          </DotContent>
        </TableContainer>
      </PersonDataBox>
      <ConfirmDemandModal
        show={show}
        handleClose={handleClose}
        submit={ClickDeleteUser}
        actionName="Você tem certeza que quer desativar este usuário?"
      />
      {boxState ? (
        <Box>
          <Ul>
            <Li onClick={() => history.push(`/usuarios/editar/${user._id}`)}>
              <Button>
                Editar
                <Icon>
                  <BsPencil />
                </Icon>
              </Button>
            </Li>
            {!(useProfileUser().user._id !== user._id) || (
              <Li onClick={handleShow}>
                <Button color="red">
                  Desativar
                  <Icon color="red">
                    <FaRegTrashAlt />
                  </Icon>
                </Button>
              </Li>
            )}
          </Ul>
        </Box>
      ) : null}
    </Content>
  );
};

export default PersonalData;
