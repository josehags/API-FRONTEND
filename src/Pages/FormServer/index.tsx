import { Form, Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import ModalServer from '../../Components/ModalServer';
import { Select } from 'antd';
import axios from 'axios';
import { fetchStates } from '../../Services/Axios/userServices';

// type IBGEUFResponse = {
//   sigla: string;
//   nome: string;
// };
// type IBGECITYResponse = {
//   id: number;
//   nome: string;
// };
export default function FormServer() {
  // const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  // const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  // const [selectedUf, setSelectedUf] = useState('0');
  // const [selectedCity, setSelectedCity] = useState('0');

  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  // const { Search } = Input;

  // useEffect(() => {
  //   if (selectedUf === '0') {
  //     return;
  //   }
  //   axios
  //     .get(
  //       `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?view=nivelado`,
  //     )
  //     .then(response => {
  //       setCities(response.data);
  //     });
  // });

  // useEffect(() => {
  //   fetchStates().then(response => {
  //     setUfs(response.data);
  //   });
  // }, [selectedUf]);
  // const handleSelectUf = (value: string) => {
  //   console.log(value);
  //   setSelectedUf(value);
  // };

  // function handleSelectCity(value: string) {
  //   setSelectedCity(value);
  // }

  // const onSearch = (value: string) => {
  //   fetch(`https://viacep.com.br/ws/${value}/json/`)
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       form.setFieldValue('rua', data.logradouro);
  //       form.setFieldValue('bairro', data.bairro);
  //       form.setFieldValue('cidade', data.localidade);
  //       form.setFieldValue('estado', data.uf);
  //     });
  // };
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: 'right', width: 'auto' }}
            onClick={() => {
              setShowModal(true);
            }}
          >
            Criar servidor
          </Button>
        </Form.Item>

        {/* <Form.Item label="CEP" name={['cep']}>
          <Search onSearch={onSearch} />
        </Form.Item>
        <Form.Item label="Rua" name={['rua']}>
          <Input />
        </Form.Item>
        <Form.Item label="Bairro" name={['bairro']}>
          <Input />
        </Form.Item>
        <Form.Item label="Estado" name={['estado']}>
          <Select
            style={{ width: 130 }}
            onChange={handleSelectUf}
            options={ufs.map(uf => ({
              label: uf.nome,
              value: uf.sigla,
            }))}
          />
        </Form.Item>
        <Form.Item label="Cidade" name={['cidade']}>
          <Select
            style={{ width: 200 }}
            onChange={handleSelectCity}
            value={selectedCity}
            options={cities.map(city => ({
              key: city.id,
              label: city.nome,
              value: city.nome,
            }))}
          />
        </Form.Item> */}
      </Form>
      <ModalServer openModal={showModal} closeModal={hideModal} />
    </>
  );
}
