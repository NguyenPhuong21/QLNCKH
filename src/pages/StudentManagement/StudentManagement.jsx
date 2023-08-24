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
        HoTen: item.attributes?.HoTen,
        HoTen: item.attributes?.HoTen,
        Ten_nganh: item.attributes?.nganh?.data?.attributes?.Ten_nganh,
        CCCD: item.attributes?.CCCD,
        SDT: item.attributes?.SDT,
        Lop: item.attributes?.Lop,
        GioiTinh: item.attributes?.GioiTinh,
        NienKhoa: item.attributes?.NienKhoa,
        DiaChi: item.attributes?.DiaChi,
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
      console.error("Error industry:", error);
    }
  };


  const handlePostStudentManagement = async () => {
    let obj;
    try {
      if (!id) {
        // if (! form.getFieldValue("MaSoSinhVien")) {
        //   return
        // }
        // if (! form.getFieldValue("TenSinhVien")) {
        //   return
        // }
        // if (! form.getFieldValue("Ten_nganh")) {
        //   return
        // }
        // if (! form.getFieldValue("CCCD")) {
        //   return
        // }
        // if (! form.getFieldValue("DiaChi")) {
        //   return
        // }
        obj = {
          url: "/sinh-viens",
          data: {
            data: {
              MaSoSinhVien: form.getFieldValue("MaSoSinhVien"),
              HoTen: form.getFieldValue("HoTen"),
              nganh: form.getFieldValue("Ten_nganh"),
              CCCD: form.getFieldValue("CCCD"),
              SDT: form.getFieldValue("SDT"),
              Lop: form.getFieldValue("Lop"),
              NienKhoa: form.getFieldValue("NienKhoa"),
              GioiTinh: form.getFieldValue("GioiTinh"),
              DiaChi: form.getFieldValue("DiaChi"),
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
              HoTen: form.getFieldValue("HoTen"),
              nganh: form.getFieldValue("Ten_nganh"),
              CCCD: form.getFieldValue("CCCD"),
              SDT: form.getFieldValue("SDT"),
              Lop: form.getFieldValue("Lop"),
              NienKhoa: form.getFieldValue("NienKhoa"),
              GioiTinh: form.getFieldValue("GioiTinh"),
              DiaChi: form.getFieldValue("DiaChi"),
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
      width: 60,
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "MaSoSinhVien",
      key: "MaSoSinhVien",
      width: 150,
      align: "center",
    },
    {
      title: "Tên sinh viên",
      dataIndex: "HoTen",
      key: "HoTen",
      width: 230,
    },
    {
      title: "Tên ngành",
      dataIndex: "Ten_nganh",
      key: "Ten_nganh",
      width: 250,
    },
    {
      title: "Căn cước công dân",
      dataIndex: "CCCD",
      key: "CCCD",
      width: 220,
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "SDT",
      key: "SDT",
      width: 140,
      align: "center",
    },
    {
      title: "Lớp",
      dataIndex: "Lop",
      key: "Lop",
      width: 140,
      align: "center",
    },
    {
      title: "Giới tính",
      dataIndex: "GioiTinh",
      key: "GioiTinh",
      width: 120,
      align: "center",
    },
    {
      title: "Niên Khóa",
      dataIndex: "NienKhoa",
      key: "NienKhoa",
      width: 140,
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      key: "DiaChi",
      width: 250,
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: 120,
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
                      label: item?.nganh,
                      value: item.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
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
                  options={[
                    {
                      label: "Nam",
                      value: "Nam",
                    },
                    {
                      label: "Nữ",
                      value: "Nữ",
                    },
                    {
                      label: "Khác",
                      value: "Khác"
                    }
                  ]}
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
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;
