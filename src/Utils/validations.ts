export const validateEmail = (email: string) => {
  const regex =
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

export const validateName = (name: string) => {
  const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{2,}$/;
  return regex.test(name);
};

export const validateCpf = (cpf: string) => {
  const regex = /^[0-9]{11}$/;
  return regex.test(cpf);
};

export const validatePhone = (phone: string) => {
  const regex = /^[0-9]{10,11}$/;
  return regex.test(phone);
};

export const validatePassword = (pass: string | any[]) => {
  if (pass.length >= 6) {
    return true;
  }
  return false;
};

export const confirmPassword = (pass1: any, pass2: any) => {
  if (pass2 === pass1) {
    return true;
  }
  return false;
};

export const validateSignUp = (email: string, name: string) => {
  if (validateName(name) && validateEmail(email)) {
    return true;
  }
  return false;
};

export const validateFields = (
  inputName: string,
  inputEmail: string,
  inputCpf: string,
  inputPhone: string,
  inputSecondaryPhone: string,
) => {
  const message = [];

  if (validateName(inputName) === false) {
    message.push('Nome inválido.');
  }
  if (validateCpf(inputCpf) === false) {
    message.push('CPF inválido. Utilize somente os digitos.');
  }
  if (validateEmail(inputEmail) === false) {
    message.push('Email inválido.');
  }
  if (validatePhone(inputPhone) === false) {
    message.push('Telefone inválido. Minimo de 10 digitos');
  }
  if (validatePhone(inputSecondaryPhone) === false) {
    message.push('Telefone secundario inválido. Minimo de 10 digitos');
  }

  return message;
};

export const validateOpen = (open: string) => {
  const regex = /^(true|false)$/;
  return regex.test(open);
};
