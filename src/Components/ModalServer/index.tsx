import { Modal, Space } from 'antd';
import { Button, Form, Input } from 'antd';
import { Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchStates } from '../../Services/Axios/userServices';

require('./index.css');

type Propos = {
  openModal: boolean;
  closeModal: (refresh: boolean) => void;
};

type IBGEUFResponse = {
  sigla: string;
  nome: string;
};
type IBGECITYResponse = {
  id: number;
  nome: string;
};
const ModalServer = ({ openModal, closeModal }: Propos) => {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECITYResponse[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  const [form] = Form.useForm();
  const { Search } = Input;

  const searchCep = (value: string) => {
    fetch(`https://viacep.com.br/ws/${value}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log('consulta API', data);
        form.setFieldValue('logradouro', data.logradouro);
        form.setFieldValue('bairro', data.bairro);
        // form.setFieldValue('cidade', data.localidade);
        // form.setFieldValue('estado', data.uf);
      });
  };
  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        setCities(response.data);
      });
  });

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then(response => {
        setUfs(response.data);
      });
  }, [selectedUf]);

  function handleSelectUf(value: string) {
    console.log(value);
    setSelectedUf(value);
  }

  function handleSelectCity(value: string) {
    console.log(value);
    setSelectedCity(value);
  }

  return (
    <Modal
      className="ant-modal-server"
      title="Servidores"
      open={openModal}
      width={1500}
      forceRender
      okText="Salvar"
      onCancel={() => {
        form.resetFields();
        closeModal(false);
      }}
    >
      <Form form={form}>
        <Form.List name={'endereço'}>
          {(fields, { add, remove }) => (
            <>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add
                </Button>
              </Form.Item>
              {fields.map(field => (
                <Space align="baseline">
                  <Form.Item label="CEP" name={[field.name, 'cep']}>
                    <Search onSearch={searchCep} />
                  </Form.Item>
                  <Form.Item label="Rua" name={['logradouro']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Bairro" name={['bairro']}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Estado" name={['estado']}>
                    <Select
                      showSearch
                      id="uf"
                      // style={{ width: 150 }}
                      placeholder="Selecione o estado"
                      optionFilterProp="children"
                      onChange={handleSelectUf}
                      value={selectedUf}
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={ufs.map(uf => ({
                        label: uf.nome,
                        value: uf.sigla,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item label="Cidade" name={['cidade']}>
                    <Select
                      showSearch
                      id="City"
                      // style={{ width: 150 }}
                      placeholder="Selecione a cidade"
                      optionFilterProp="children"
                      onChange={handleSelectCity}
                      value={selectedCity}
                      filterOption={(input, option) =>
                        (option?.label ?? '')
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={cities.map(city => ({
                        key: city.id,
                        label: city.nome,
                        value: city.nome,
                      }))}
                    />
                  </Form.Item>

                  <DeleteOutlined
                    style={{ color: 'red' }}
                    onClick={() => remove(field.name)}
                  />
                </Space>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default ModalServer;
