// import { Input, Form, Row, Col, Button } from 'antd';
// import { useState } from 'react';

// export default function FormServer() {
//   const [name, setName] = useState('');
//   const [mother, setMother] = useState('');
//   const [yearsold, setYearsold] = useState('');

//   function handleFinish(a: any) {
//     console.log(a);
//   }

//   return (
//     <>
//       {/*    { name },{ mother }, { yearsold } */}
//       <Form layout="vertical" onFinish={handleFinish}>
//         <Row gutter={24}>
//           <Col span={8}>
//             <Form.Item name={['fullname']} label="Nome completo">
//               <Input value={name} onChange={e => setName(e.target.value)} />
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item name={['mother']} label="Nome da Mãe">
//               <Input value={mother} onChange={e => setMother(e.target.value)} />
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item name={['yearsold']} label="Idade">
//               <Input
//                 type="number"
//                 value={yearsold}
//                 onChange={e => setYearsold(e.target.value)}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Row justify="end">
//           <Button type="primary" htmlType="submit">
//             Salvar Servidor
//           </Button>
//         </Row>
//       </Form>
//     </>
//   );
// }
import 'antd/dist/antd.css';
import { Button, Table, Modal, Input } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type Property = {
  id: number;
  name: string;
  email: string;
  address: string;
};
function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Property | null>(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: 'John',
      email: 'john@gmail.com',
      address: 'John Address',
    },
    {
      id: 2,
      name: 'David',
      email: 'david@gmail.com',
      address: 'David Address',
    },
    {
      id: 3,
      name: 'James',
      email: 'james@gmail.com',
      address: 'James Address',
    },
    {
      id: 4,
      name: 'Sam',
      email: 'sam@gmail.com',
      address: 'Sam Address',
    },
  ]);
  const columns = [
    {
      key: '1',
      title: 'ID',
      dataIndex: 'id',
    },
    {
      key: '2',
      title: 'Name',
      dataIndex: 'name',
    },
    {
      key: '3',
      title: 'Email',
      dataIndex: 'email',
    },
    {
      key: '4',
      title: 'Address',
      dataIndex: 'address',
    },
    {
      key: '5',
      title: 'Actions',
      render: (record: any) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                console.log(record);
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    const randomNumber = Math.random() * 1000;
    const newStudent = {
      id: randomNumber,
      name: 'Name ' + randomNumber,
      email: randomNumber + '@gmail.com',
      address: 'Address ' + randomNumber,
    };
    setDataSource(pre => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record: any) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this student record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        setDataSource(pre => {
          return pre.filter(student => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record: any) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
    console.log(record);
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Student</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource(pre => {
              return pre.map(student => {
                if (
                  editingStudent !== null &&
                  student.id === editingStudent.id
                ) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={e => {
              setEditingStudent((pre: any) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={e => {
              setEditingStudent((pre: any) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={e => {
              setEditingStudent((pre: any) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;
