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
  DatePicker,
} from "antd";
import { get, Post, Put, Delete } from "../../services/Api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const StudentManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create");
  const [faculties, setFaculties] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [id, setId] = useState(null);

  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  useEffect(() => {
    handleGetStudentManagement();
    handleGetFacultyManagement();
    handleGetIndustryManagement();
  }, []);

  const handleGetStudentManagement = async () => {
    try {
      let obj = {
        url: "/sinh-viens?populate=khoa,nganh",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        MaSoSinhVien: item.attributes?.MaSoSinhVien,
        TenGiangVien: item.attributes?.TenGiangVien,
        HoTen: item.attributes?.HoTen,
        Ten_khoa: item.attributes?.khoa?.data?.attributes?.Ten_khoa,
        Ten_nganh: item.attributes?.nganh?.data?.attributes?.Ten_nganh,
      }));
      setLecturers(extractedData);
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

  const handleGetIndustryManagement = async () => {
    try {
      let obj = {
        url: "/nganhs",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        Ten_nganh: item.attributes?.Ten_nganh,
      }));
      setIndustry(extractedData);
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handlePostStudentManagement = async () => {
    let obj;
    try {
      if (!id) {
        obj = {
          url: "/sinh-viens",
          data: {
            data: {
              MaSoGiangVien: form.getFieldValue("MaSoGiangVien"),
              TenGiangVien: form.getFieldValue("TenGiangVien"),
              nganh: form.getFieldValue("nganh"),
              khoa: form.getFieldValue("khoa"),
            },
          },
        };
        await Post(obj);
      } else {
        obj = {
          url: `/sinh-viens/${id}`,
          data: {
            data: {
              MaSoGiangVien: form.getFieldValue("MaSoGiangVien"),
              TenGiangVien: form.getFieldValue("TenGiangVien"),
              nganh: form.getFieldValue("nganh"),
              khoa: form.getFieldValue("khoa"),
            },
          },
        };
        await Put(obj);
      }
      form.resetFields();
      handleGetStudentManagement();
      setVisible(false);
      return response;
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handleDeleteStudentManagement = async (record) => {
    let obj = {
      url: `/sinh-viens/${record.id}`,
    };
    const res = await Delete(obj);
    if (res.status == "SUCCESS") {
      notification.success({
        message: "Đã xóa thành công",
        duration: 3,
      });
    }
    handleGetStudentManagement();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "MaSoSinhVien",
      key: "MaSoSinhVien",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "HoTen",
      key: "HoTen",
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
            onClick={() => {
              setMode("edit");
              handleEdit(record);
            }}
          >
            sửa
          </Button>
          <Button onClick={() => handleDeleteStudentManagement(record)}>
            Xóa
          </Button>
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
      <div className="heading">Quản lý sinh viên</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm sinh viên
        </Button>
      </div>
      <Table columns={columns} dataSource={lecturers} rowKey="id" />

      <Modal
        visible={visible}
        title="Thêm/sửa sinh viên"
        onCancel={handleCancel}
        onOk={handlePostStudentManagement}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="MaSoGiangVien"
                label="Thêm mã giảng viên"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào mã giảng viên",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="TenGiangVien"
                label="Thêm tên giảng viên"
                rules={[
                  { required: true, message: " Vui lòng nhập vào giảng viên" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
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
                label="Chọn ngành"
                name="nganh"
                rules={[
                  { required: true, message: "Vui lòng chọn ngành tương ứng" },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn ngành tương ứng"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={industry.map((item) => {
                    return {
                      label: item?.Ten_nganh,
                      value: item.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="TrinhDo"
                label="Thêm trình độ"
                rules={[
                  { required: true, message: " Vui lòng nhập vào trình độ" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item name="Ngày sinh" label="Thêm ngày sinh">
                <DatePicker format={dateFormat} />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;

