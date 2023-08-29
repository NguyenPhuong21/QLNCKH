import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Space,
  Select,
  DatePicker,
} from "antd";
import "react-quill/dist/quill.snow.css";
import { get, Post, Put, Delete } from "../../services/Api";
import dayjs from "dayjs";

const SubscribeTopic = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [industry, setIndustry] = useState([]);

  const { TextArea } = Input;
  useEffect(() => {
    handleGetSubscribeTopic();
  }, []);

  const handleGetSubscribeTopic = async () => {
    try {
      let obj = {
        url: "/de-tais?populate=*",
      };
      const response = await get(obj);
      const subscribeTopicData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        TenDeTai: item.attributes?.TenDeTai,
        Ten_nganh: item.attributes?.MaNganh?.data?.attributes?.Ten_nganh,
        GhiChu: item.attributes?.GhiChu,
        MaTrangThai:
          item.attributes?.MaTrangThai?.data?.attributes?.TenTrangThai,
        NgayThucHien: item.attributes?.NgayThucHien,
        NgayKetThuc: item.attributes?.NgayKetThuc,
      }));
      setLecturers(subscribeTopicData);
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

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: "Tên đề tài",
      dataIndex: "TenDeTai",
      key: "TenDeTai",
      width: 300,
    },
    {
      title: "Tên ngành",
      dataIndex: "Ten_nganh",
      key: "Ten_nganh",
      width: 220,
    },
    {
      title: "Ngày thực hiện",
      dataIndex: "NgayThucHien",
      key: "NgayThucHien",
      width: 220,
      render: (text) => (
        <div>{dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "NgayKetThuc",
      key: "NgayKetThuc",
      width: 220,
      render: (text) => (
        <div>{dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "MaTrangThai",
      key: "MaTrangThai",
      width: 220,
      align: "center",
      render: (text, record) => (
        <div className="status-custom">
          <span
            style={
              text === "Đăng kí"
                ? { background: "rgb(255, 0, 0, .50)" }
                : text === "Đề xuất"
                ? { background: "rgb(0, 128, 0, .5)" }
                : text === "Nghiệm thu cấp bộ môn"
                ? { background: "rgb(0, 128, 0, .5)" }
                : text === "Nghiệm thu cấp khoa"
                ? { background: "rgb(0, 128, 0, .5)" }
                : text === "Nghiệm thu cấp khoa"
                ? { background: "rgb(0, 128, 0, .5)" }
                : text === "báo cáo cấp trường"
                ? { background: "rgb(0, 128, 0, .5)" }
                : text === "Kết thúc"
                ? { background: "rgb(0, 128, 0, .5)" }
                : {}
            }
          >
            {text}
          </span>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      dataIndex: "GhiChu",
      key: "GhiChu",
      width: 300,
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
    const editData = {
      ...record,
      NgayThucHien: dayjs(record?.NgayThucHien, "YYYY-MM-DD"),
      NgayKetThuc: dayjs(record?.NgayKetThuc, "YYYY-MM-DD"),
    };
    form.setFieldsValue(editData);
    setId(record.id);
    showModal();
  };

  return (
    <>
      <div className="heading">Đăng kí đề tài</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm đề tài
        </Button>
      </div>
      <Table columns={columns} dataSource={lecturers} rowKey="id" />
      <Modal
        visible={visible}
        title="Thêm/sửa đề tài"
        onCancel={handleCancel}
        // onOk={handlePostStudentManagement}
      >
        <Form form={form} layout="vertical">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="TenDeTai"
                label="Tên đề tài"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào tên đề tài",
                  },
                ]}
              >
                <Input placeholder="Nhập vào tên đề tài" />
              </Form.Item>
            </div>
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
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="GhiChu"
                label="Thêm ghi chú"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào ghi chú",
                  },
                ]}
              >
                <TextArea placeholder="Nhập vào ghi chú" />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="NgayThucHien"
                label="Ngày thực hiện"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào ghi chú",
                  },
                ]}
              >
                <DatePicker
                  format={"DD-MM-YYYY"}
                  renderExtraFooter={() => "extra footer"}
                  placeholder="Chọn ngày thực hiện"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                format={"DD-MM-YYYY"}
                name="NgayKetThuc"
                label="Ngày kết thúc"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào ghi chú",
                  },
                ]}
              >
                <DatePicker
                  renderExtraFooter={() => "extra footer"}
                  placeholder="Chọn ngày kết thúc"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                label="Chọn trạng thái"
                name="MaTrangThai"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn trạng thái tương ứng",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn trạng thái tương ứng"
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
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                label="Chọn giảng viên"
                name="MaGiangVien"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn giảng viên tương ứng",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn giảng viên tương ứng"
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
                name="KetQua"
                label="kết quả"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào kết quả",
                  },
                ]}
              >
                <Input placeholder="Nhập vào kết quả" />
              </Form.Item>
            </div>
          </div>
          <div>link đề tài</div>
        </Form>
      </Modal>
    </>
  );
};

export default SubscribeTopic;
