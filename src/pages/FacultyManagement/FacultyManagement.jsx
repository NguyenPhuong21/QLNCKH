import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  notification,
  Popconfirm,
  Image,
} from "antd";
import { get, Post, Put, Delete } from "../../services/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { deleteIcon, editIcon } from "../../assets";
import CustomButton from "../../components/CustomButton";

// import 'antd/dist/antd.css';

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create");
  const [id, setId] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    handleGetFacutyManagement();
  }, []);

  const handleGetFacutyManagement = async () => {
    try {
      let obj = {
        url: "/khoas",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        Ten_khoa: item.attributes.Ten_khoa,
      }));
      setFaculties(extractedData);
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handlePostFacutyManagement = async () => {
    let obj;
    try {
      if (!id) {
        obj = {
          url: "/khoas",
          data: {
            data: {
              Ten_khoa: form.getFieldValue("Ten_khoa"),
            },
          },
        };
        await Post(obj);
      } else {
        obj = {
          url: `/khoas/${id}`,
          data: {
            data: {
              Ten_khoa: form.getFieldValue("Ten_khoa"),
            },
          },
        };
        await Put(obj);
      }
      form.resetFields();
      handleGetFacutyManagement();
      setVisible(false);
      return response;
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handleDeleteFacutyManagement = async (record) => {
    let obj = {
      url: `/khoas/${record.id}`,
      data: {
        data: {
          Ten_khoa: form.getFieldValue("Ten_khoa"),
        },
      },
    };
    const res = await Delete(obj);
    if (res.status == "SUCCESS") {
      notification.success({
        message: "Đã xóa thành công",
        duration: 3,
      });
    }
    handleGetFacutyManagement();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên khoa",
      dataIndex: "Ten_khoa",
      key: "Ten_khoa",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            onClick={() => {
              setMode("edit");
              handleEdit(record);
            }}
            icon={<Image width={24} src={editIcon} preview={false} />}
          ></Button>
          <Popconfirm
            title="Xác nhận xóa đăng kí đề tài:"
            description={record.TenDeTai}
            icon={<QuestionCircleOutlined />}
            onConfirm={() => handleDeleteFacutyManagement(record)}
          >
            <CustomButton
              type="text"
              icon={<Image width={22} src={deleteIcon} preview={false} />}
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const showModal = () => {
    setVisible(true);
    setMode("create");
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setId(record.id);
    showModal();
  };

  return (
    <div>
      <div className="heading">Quản lý khoa</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm khoa
        </Button>
      </div>
      <Table columns={columns} dataSource={faculties} rowKey="id" />
      <Modal
        visible={visible}
        title="Thêm/sửa khoa"
        onCancel={handleCancel}
        onOk={handlePostFacutyManagement}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="Ten_khoa"
            label="Tên khoa"
            rules={[{ required: true, message: "Vui lòng nhập vào tên khoa" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FacultyManagement;
