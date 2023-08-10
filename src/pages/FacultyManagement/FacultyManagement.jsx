import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space } from "antd";
// import 'antd/dist/antd.css';

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khoa",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngành",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Hội đồng nghiệm thu",
      dataIndex: "ma_khoa",
      key: "ma_khoa",
    },
    {
      title: "Hội đồng duyệt đề cương",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Hành động",
      key: "action",
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>sửa</Button>
          <Button onClick={() => handleDelete(record.id)} >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newFaculty = {
        id: faculties.length + 1,
        name: values.name,
      };
      setFaculties([...faculties, newFaculty]);
      form.resetFields();
      setVisible(false);
    });
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    showModal();
  };

  const handleDelete = (id) => {
    setFaculties(faculties.filter((faculty) => faculty.id !== id));
  };

  return (
    <div>
      <Button type="primary" onClick={showModal} style={{display:'flex', justifyContent:'flex-end'}}>
        Thêm khoa
      </Button>
      <Table columns={columns} dataSource={faculties} rowKey="id" />
      <Modal
        visible={visible}
        title="Add/Edit Faculty"
        onCancel={handleCancel}
        onOk={handleSave}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Faculty Name"
            rules={[{ required: true, message: "Please enter faculty name" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FacultyManagement;
