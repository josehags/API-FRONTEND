import { Input, Form, Row, Col, Button } from 'antd';
import { useState } from 'react';

export default function FormServer() {
  const [name, setName] = useState('');
  const [mother, setMother] = useState('');
  const [yearsold, setYearsold] = useState('');

  function handleFinish(a: any) {
    console.log(a);
  }

  return (
    <>
      {/*    { name },{ mother }, { yearsold } */}
      <Form layout="vertical" onFinish={handleFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item name={['fullname']} label="Nome completo">
              <Input value={name} onChange={e => setName(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={['mother']} label="Nome da Mãe">
              <Input value={mother} onChange={e => setMother(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name={['yearsold']} label="Idade">
              <Input
                type="number"
                value={yearsold}
                onChange={e => setYearsold(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" htmlType="submit">
            Salvar Servidor
          </Button>
        </Row>
      </Form>
    </>
  );
}
// import { Modal } from 'antd';
// import { Button, Form, Input } from 'antd';
// import React, { useState } from 'react';
// import { Col } from 'antd';

// const App: React.FC = () => {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const [sector, setSector] = useState('');
//   const showModal = () => {
//     setOpen(true);
//   };

//   function handleFinish(a: any) {
//     console.log(a);
//   }

//   const handleOk = () => {
//     setOpen(false);
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <a type="primary" onClick={showModal}>
//         {' '}
//         Alterar
//       </a>
//       <Modal
//         open={open}
//         title="Atualizar Usuário..."
//         onOk={handleOk}
//         onCancel={handleCancel}
//         footer={[
//           <Button key="submit" type="primary" onClick={handleOk}>
//             Cancelar
//           </Button>,
//           <Button
//             key="link"
//             href="https://google.com"
//             type="primary"
//             onClick={handleOk}
//           >
//             Salvar
//           </Button>,
//         ]}
//       >
//         <>
//           <Form layout="vertical" onFinish={handleFinish}>
//             <Col offset={1} span={16}>
//               <Form.Item name={['fullname']} label="Nome">
//                 <Input
//                   value={name}
//                   placeholder="Digite o seu nome"
//                   onChange={e => setName(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col offset={1} span={16}>
//               <Form.Item name={['email']} label="Email">
//                 <Input
//                   value={email}
//                   placeholder="Digite o seu email"
//                   onChange={e => setEmail(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col offset={1} span={16}>
//               <Form.Item name={['role']} label="Função">
//                 <Input
//                   value={role}
//                   placeholder="Digite a sua função"
//                   onChange={e => setRole(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col offset={1} span={16}>
//               <Form.Item name={['sector']} label="Setor">
//                 <Input
//                   value={sector}
//                   placeholder="Digite o seu setor"
//                   onChange={e => setSector(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Form>
//         </>
//       </Modal>
//     </>
//   );
// };

// export default App;
