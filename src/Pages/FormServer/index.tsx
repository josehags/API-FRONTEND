// import { Button, Table, Form, Input } from "antd";
import { Button, Form, Input, Table } from 'antd';
import { useEffect, useState } from 'react';
interface DataType {
  key: string;
  name: string;
  address: string;
}

function App() {
  const [dataSource, setDataSource] = useState<DataType[]>();
  const [editingRow, setEditingRow] = useState<number | any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const data = [];
    for (let index = 0; index < 6; index++) {
      data.push({
        key: `${index}`,
        name: `Name ${index}`,
        address: `Address ${index}`,
      });
    }
    setDataSource(data);
  }, []);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please enter your name',
                },
              ]}
            >
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (text: any, record: any) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="address">
              <Input />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: 'Actions',
      render: (_: any, record: any) => {
        return (
          <>
            <Button
              type="link"
              onClick={() => {
                console.log('oi', record);
                setEditingRow(record.key);
                form.setFieldsValue({
                  name: record.name,
                  address: record.address,
                });
              }}
            >
              Edit
            </Button>
            <Button type="link" htmlType="submit">
              Save
            </Button>
          </>
        );
      },
    },
  ];
  const onFinish = (values: any) => {
    // const updatedDataSource = [...dataSource];
    // updatedDataSource.splice(editingRow, 1);
    // setDataSource(updatedDataSource);
    // setEditingRow(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Table columns={columns} dataSource={dataSource}></Table>
        </Form>
      </header>
    </div>
  );
}

export default App;
