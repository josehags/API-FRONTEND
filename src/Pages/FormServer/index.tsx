import { Form, Button, Input } from 'antd';
import { useState } from 'react';
import ModalServer from '../../Components/ModalServer';
import { Select } from 'antd';
import { useListCidEst } from '../../hooks/useListCidEst';
import { useListCidade } from '../../hooks/useListCidade';

export default function FormServer() {
  const [showModal, setShowModal] = useState(false);
  const { Search } = Input;
  const [form] = Form.useForm();
  const { estados } = useListCidEst();
  const { cidades } = useListCidade({ uf: 'RJ' });

  const onSearch = (value: string) => {
    fetch(`https://viacep.com.br/ws/${value}/json/`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        form.setFieldValue('rua', data.logradouro);
        form.setFieldValue('bairro', data.bairro);
        form.setFieldValue('cidade', data.localidade);
        form.setFieldValue('estado', data.uf);
      });
  };
  const hideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form form={form}>
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

        <Form.Item label="CEP" name={['cep']}>
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
            style={{ width: 200 }}
            options={estados.map(estados => ({
              label: estados.nome,
              value: estados.nome,
            }))}
          />
        </Form.Item>
        <Form.Item label="Cidade" name={['cidade']}>
          <Select
            style={{ width: 200 }}
            options={cidades.map(cidades => ({
              label: cidades.nome,
              value: cidades.nome,
            }))}
          />
        </Form.Item>
      </Form>
      <ModalServer openModal={showModal} closeModal={hideModal} />
    </>
  );
}
{
  /* 
<select>
      {estados.map(estados => (
        <option>{estados.nome}</option>
      ))}
</select> 
*/
}
