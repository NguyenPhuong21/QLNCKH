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

const StudentManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create");
  const [industry, setIndustry] = useState([]);
  const [id, setId] = useState(null);
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const { TextArea } = Input;
  useEffect(() => {
    handleGetStudentManagement();
    handleGetIndustryManagement();
  }, []);
  useEffect(() => {
    if (!visible) {
      setId(null);
    }
  }, [visible]);
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
        Ten_nganh: item.attributes?.nganh?.data?.attributes?.Ten_nganh,
        CCCD: item.attributes?.CCCD,
        SDT: item.attributes?.SDT,
        Lop: item.attributes?.Lop,
        GioiTinh: item.attributes?.GioiTinh,
        NienKhoa: item.attributes?.NienKhoa,
        DiaChi: item.attributes?.DiaChi,
        NgaySinh: item.attributes?.NgaySinh,
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
              NgaySinh: form.getFieldValue("NgaySinh"),
            },
          },
        };
        await Post(obj);
        notification.success({
          message: "Thêm sinh viên thành công",
          duration: 3,
        });
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
              NgaySinh: form.getFieldValue("NgaySinh"),
            },
          },
        };
        await Put(obj);
        notification.success({
          message: "Sửa sinh viên thành công",
          duration: 3,
        });
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
      notification.success({
        message: "Đã xóa thành công",
        duration: 3,
      });
    handleGetStudentManagement();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
      fixed: 'left',
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "MaSoSinhVien",
      key: "MaSoSinhVien",
      width: 150,
      align: "center",
      fixed: 'left',
    },
    {
      title: "Tên sinh viên",
      dataIndex: "HoTen",
      key: "HoTen",
      width: 180,
      fixed: 'left',
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      key: "NgaySinh",
      width: 120,
      align: "center",
      render: (text) => (
        <div>{dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Tên ngành",
      dataIndex: "Ten_nganh",
      key: "Ten_nganh",
      width: 220,
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
      width: 150,
      align: "center",
      fixed: 'right',
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
    console.log(record);
    const nganhId = industry.find(
      (item) => item.nganh === record?.Ten_nganh
    )?.id;
    const editData = {
      ...record,
      NgaySinh: dayjs(record?.NgaySinh, "YYYY-MM-DD"),
      Ten_nganh: nganhId,
    };
    form.setFieldsValue(editData);
    setId(record.id);
    showModal();
  };

  return (
    <div>
      {contextHolder}
      <div className="heading">Quản lý sinh viên</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm sinh viên
        </Button>
      </div>
      <Table
        columns={columns}
        style={{ width: "100%" }}
        dataSource={lecturers}
        rowKey="id"
        scroll={{ y: 620 }}
      />

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
                    message: " Vui lòng nhập vào mã sinh viên",
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
                  {
                    required: true,
                    message: " Vui lòng nhập vào tên sinh viên",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="NgaySinh"
                label="Ngày sinh"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào ngày sinh",
                  },
                ]}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  placeholder="Chọn ngày sinh"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="DiaChi"
                label="Địa chỉ"
                rules={[
                  { required: true, message: " Vui lòng nhập vào Địa chỉ" },
                ]}
              >
                <TextArea />
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
                      value: "Khác",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default StudentManagement;
