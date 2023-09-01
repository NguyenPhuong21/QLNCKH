import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  notification,
  Select,
  Popconfirm,
  Image,
} from "antd";
import { get, Post, Put, Delete } from "../../services/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CustomButton from "../../components/CustomButton";
import { deleteIcon, editIcon } from "../../assets";

// import 'antd/dist/antd.css';

const IndustryManagement = () => {
  const [industry, setIndustry] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create");
  const [faculties, setFaculties] = useState([]);
  const [id, setId] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    handleGetIndustryManagement();
    handleGetFacultyManagement();
  }, []);

  const handleGetIndustryManagement = async () => {
    try {
      let obj = {
        url: "/nganhs?populate=khoa",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        Ten_nganh: item.attributes.Ten_nganh,
        Ten_khoa: item.attributes?.khoa?.data?.attributes?.Ten_khoa,
      }));
      setIndustry(extractedData);
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };
  const handleGetFacultyManagement = async () => {
    try {
      let obj = {
        url: "/khoas",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        Ten_khoa: item.attributes?.Ten_khoa,
      }));
      setFaculties(extractedData);
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handlePostIndustryManagement = async () => {
    let obj;
    try {
      if (!id) {
        obj = {
          url: "/nganhs",
          data: {
            data: {
              Ten_nganh: form.getFieldValue("Ten_nganh"),
              khoa: form.getFieldValue("khoa"),
            },
          },
        };
        await Post(obj);
      } else {
        obj = {
          url: `/nganhs/${id}`,
          data: {
            data: {
              Ten_nganh: form.getFieldValue("Ten_nganh"),
              khoa: form.getFieldValue("khoa"),
            },
          },
        };
        await Put(obj);
      }
      form.resetFields();
      handleGetIndustryManagement();
      setVisible(false);
      // return response;
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handleDeleteIndustryManagement = async (record) => {
    let obj = {
      url: `/nganhs/${record.id}`,
    };
    const res = await Delete(obj);
    if (res.status == "SUCCESS") {
      notification.success({
        message: "Đã xóa thành công",
        duration: 3,
      });
    }
    handleGetIndustryManagement();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Tên Khoa",
      dataIndex: "Ten_khoa",
      key: "Ten_khoa",
    },
    {
      title: "Tên ngành",
      dataIndex: "Ten_nganh",
      key: "Ten_nganh",
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
          >
          </Button>
          <Popconfirm
            title="Xác nhận xóa ngành:"
            description={record.Ten_nganh}
            icon={<QuestionCircleOutlined />}
            onConfirm={() => handleDeleteIndustryManagement(record)}
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
    const editData = {
      ...record,
      khoa: faculties.find((item) => item.Ten_khoa === record.Ten_khoa)?.id,
    };
    form.setFieldsValue(editData);
    setId(record.id);
    showModal();
  };

  return (
    <div>
      <div className="heading">Quản lý bộ môn</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm bộ môn
        </Button>
      </div>
      <Table columns={columns} dataSource={industry} rowKey="id" />

      <Modal
        visible={visible}
        title="Thêm/sửa bộ môn"
        onCancel={handleCancel}
        onOk={handlePostIndustryManagement}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                label="Chọn khoa"
                name="khoa"
                rules={[
                  { required: true, message: "Vui lòng chọn khoa tương ứng" },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn khoa tương ứng"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={faculties.map((item) => {
                    return {
                      label: item?.Ten_khoa,
                      value: item.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="Ten_nganh"
                label="Thêm ngành"
                rules={[
                  { required: true, message: " Vui lòng nhập vào tên ngành" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default IndustryManagement;
