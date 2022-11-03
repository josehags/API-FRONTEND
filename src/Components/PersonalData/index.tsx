import React, { useEffect, useState } from 'react';

import { useProfileUser, UserTipo } from '../../Context';
import { Content } from './Style';
import { deleteUser } from '../../Services/Axios/userServices';

const PersonalData = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [boxState, setBoxState] = useState(false);
  const [userSector, setUserSector] = useState([]);
  const { startModal } = useProfileUser();
  const [user, setUser] = useState<UserTipo | null>(null);

  const closeBox = () => {
    if (boxState) {
      setBoxState(false);
    }
  };

  const ClickDeleteUser = () => {
    deleteUser(user?.id, startModal);
    setUser(startModal);
  };

  const translateRole = (role: string | number) => {
    const rolesDict = {
      admin: 'Administrador',
      professional: 'Profissional',
      receptionist: 'Recepcionista',
    };
    return rolesDict;
  };

  return;
};
export default PersonalData;
