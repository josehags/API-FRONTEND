import { Modal, Space } from 'antd';
import { Button, Form, Input } from 'antd';
import { Select } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import {
  fetchCities,
  fetchStates,
  getCep,
} from '../../Services/Axios/userServices';

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
  const [selectUf, setselectUf] = useState('0');
  const [selectCity, setselectCity] = useState('0');
  const [form] = Form.useForm();
  const { Search } = Input;

  const searchCep = (value: string) => {
    if (value.length === 8) {
      getCep(value).then(data => {
        console.log('consulta API', data.data);
        form.setFieldValue('logradouro', data.data.logradouro);
        form.setFieldValue('bairro', data.data.bairro);
        // form.setFieldValue('cidade', data.data.localidade);
        // form.setFieldValue('estado', data.data.uf);
      });
    }
  };

  useEffect(() => {
    fetchStates().then(response => {
      setUfs(response.data);
    });
  }, [selectUf]);

  useEffect(() => {
    if (selectUf === '0') {
      return;
    }
    fetchCities(selectUf).then(response => {
      setCities(response.data);
    });
  });

  function handleSelectUf(value: string) {
    console.log(value);
    setselectUf(value);
  }

  function handleSelectCity(value: string) {
    console.log(value);
    setselectCity(value);
  }

  const onFinish = (values: any) => {
    console.log('Valores do formulário:', values);
  };

  return (
    <Modal
      className="ant-modal-server"
      title="Servidores"
      open={openModal}
      width={1290}
      forceRender
      okText="Salvar"
      onOk={onFinish}
      onCancel={() => {
        form.resetFields();
        closeModal(false);
      }}
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Form.List name={'adress'}>
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
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item label="CEP" name={[name, 'cep']} {...restField}>
                    <Search onSearch={searchCep} />
                  </Form.Item>
                  <Form.Item
                    label="Rua"
                    name={[name, 'logradouro']}
                    {...form.getFieldsValue}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Bairro"
                    name={[name, 'bairro']}
                    {...restField}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Estado"
                    name={[name, 'estado']}
                    {...restField}
                  >
                    <Select
                      showSearch
                      placeholder="Selecione o estado"
                      onChange={handleSelectUf}
                      value={selectUf}
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
                  <Form.Item
                    label="Cidade"
                    name={[name, 'cidade']}
                    {...restField}
                  >
                    <Select
                      showSearch
                      style={{ width: 'auto' }}
                      placeholder="Selecione a cidade"
                      onChange={handleSelectCity}
                      value={selectCity}
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
                    onClick={() => remove(name)}
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

{
  /* teste */
}

// <Form form={form} layout={'vertical'}>
// <Form.Item label="CEP" name={['cep']} style={{ width: 355 }}>
//   <Search onSearch={searchCep} />
// </Form.Item>
// <Form.Item label="Rua" name={['logradouro']} style={{ width: 355 }}>
//   <Input />
// </Form.Item>
// <Form.Item label="Bairro" name={['bairro']} style={{ width: 355 }}>
//   <Input />
// </Form.Item>
// <Form.Item label="Estado" name={['estado']}>
//   <Select
//     showSearch
//     id="uf"
//     placeholder="Selecione o estado"
//     optionFilterProp="children"
//     onChange={handleSelectUf}
//     value={selectUf}
//     filterOption={(input, option) =>
//       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//     }
//     options={ufs.map(uf => ({
//       label: uf.nome,
//       value: uf.sigla,
//     }))}
//   />
// </Form.Item>
// <Form.Item label="Cidade" name={['cidade']}>
//   <Select
//     showSearch
//     id="City"
//     placeholder="Selecione a cidade"
//     optionFilterProp="children"
//     onChange={handleSelectCity}
//     value={selectCity}
//     filterOption={(input, option) =>
//       (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//     }
//     options={cities.map(city => ({
//       key: city.id,
//       label: city.nome,
//       value: city.nome,
//     }))}
//   />
// </Form.Item>
// </Form>
