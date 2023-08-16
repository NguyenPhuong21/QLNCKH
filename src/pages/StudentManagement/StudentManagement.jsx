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

const StudentManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create");
  const [industry, setIndustry] = useState([]);
  const [id, setId] = useState(null);

  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  useEffect(() => {
    handleGetStudentManagement();
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
        Ten_nganh: item.attributes?.nganh?.data?.attributes?.Ten_nganh,
      }));
      setLecturers(extractedData);
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
        nganh: item.attributes?.Ten_nganh,
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
              MaSoSinhVien: form.getFieldValue("MaSoSinhVien"),
              TenSinhVien: form.getFieldValue("TenSinhVien"),
              nganh: form.getFieldValue("Ten_nganh"),
              NgaySinh: form.getFieldValue("NgaySinh"),
              CCCD: form.getFieldValue("CCCD"),
              TkNganHang:form.getFieldValue("TkNganHang"),
              SDT:form.getFieldValue("SDT"),
              Lop:form.getFieldValue("Lop"),
              NienKhoa:form.getFieldValue("NienKhoa"),
              GioiTinh:form.getFieldValue("GioiTinh"),
              DiaChi:form.getFieldValue("DiaChi"),
              ChiNhanhNH:form.getFieldValue("ChiNhanhNH"),
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
              nganh: form.getFieldValue("Ten_nganh"),
              NgaySinh: form.getFieldValue("NgaySinh"),
              CCCD: form.getFieldValue("CCCD"),
              TkNganHang:form.getFieldValue("TkNganHang"),
              SDT:form.getFieldValue("SDT"),
              Lop:form.getFieldValue("Lop"),
              NienKhoa:form.getFieldValue("NienKhoa"),
              GioiTinh:form.getFieldValue("GioiTinh"),
              DiaChi:form.getFieldValue("DiaChi"),
              ChiNhanhNH:form.getFieldValue("ChiNhanhNH"),
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
                name="MaSoSinhVien"
                label="Thêm mã sinh viên"
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
                name="HoTen"
                label="Thêm tên sinh viên"
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
                label="Chọn ngành"
                name="Ten_nganh"
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
            <div style={{ width: "48%" }}>
              <Form.Item name="NgaySinh" label="Thêm ngày sinh">
                <DatePicker
                  format={dateFormat}
                  placeholder="Chọn ngày sinh"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="CCCD"
                label="Căn cước công dân"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào Căn cước công dân",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item name="TkNganHang" label="Tài khoản ngân hàng">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item name="SDT" label="Số điện thoại">
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
            <Form.Item name="Lop" label="Lớp">
                <Input />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item name="NienKhoa" label="Niên Khóa">
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                label="Giới tính"
                name="GioiTinh"
                rules={[{ required: true, message: "Vui lòng chọn Giới tính" }]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn giới tính tương ứng"
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
                name="DiaChi"
                label="Địa chỉ"
                rules={[
                  { required: true, message: " Vui lòng nhập vào Địa chỉ" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item name="ChiNhanhNH" label="Chi nhánh">
                <Input />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;
