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
  Popconfirm,
  Image,
  Typography,
} from "antd";
import "react-quill/dist/quill.snow.css";
import { get, Post, Put, Delete } from "../../services/Api";
import dayjs from "dayjs";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { deleteIcon } from "../../assets";
import CustomButton from "../../components/CustomButton";
import { editIcon } from "../../assets";

const AssignTopics = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [lecturers, setLecturers] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [status, setStatus] = useState([]);

  const { TextArea } = Input;
  useEffect(() => {
    handleGetAssignTopics();
    handleGetAssignTopicsManagement();
    handleGetLecturersManagement();
    handleGetStatusManagement();
  }, []);

  const handleGetAssignTopics = async () => {
    try {
      let obj = {
        url: "/de-tais?populate=*",
      };
      const response = await get(obj);
      const assignTopicsData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        TenDeTai: item.attributes?.TenDeTai,
        Ten_nganh: item.attributes?.MaNganh?.data?.attributes?.Ten_nganh,
        GhiChu: item.attributes?.GhiChu,
        MaTrangThai:
          item.attributes?.MaTrangThai?.data?.attributes?.TenTrangThai,
        MaGiangVien:
          item.attributes?.MaGiangVien?.data?.attributes?.TenGiangVien,
        NgayThucHien: item.attributes?.NgayThucHien,
        NgayKetThuc: item.attributes?.NgayKetThuc,
      }));
      setLecturers(assignTopicsData);
    } catch (error) {
      console.error("Error AssignTopic:", error);
    }
  };

  const handleGetAssignTopicsManagement = async () => {
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

  const handleGetLecturersManagement = async () => {
    try {
      let obj = {
        url: "/giang-viens",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        TenGiangVien: item.attributes?.TenGiangVien,
      }));
      setLecturer(extractedData);
    } catch (error) {
      console.error("Error Lecturer:", error);
    }
  };

  const handleGetStatusManagement = async () => {
    try {
      let obj = {
        url: "/trang-thais",
      };
      const response = await get(obj);
      const statusData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        TenTrangThai: item.attributes?.TenTrangThai,
      }));
      setStatus(statusData);
    } catch (error) {
      console.error("Error status:", error);
    }
  };

  const handlePostLecturersManagement = async () => {
    let obj;
    try {
      if (!id) {
        obj = {
          url: "/de-tais",
          data: {
            data: {
              TenDeTai: form.getFieldValue("TenDeTai"),
              MaNganh: form.getFieldValue("MaNganh"),
              GhiChu: form.getFieldValue("GhiChu"),
              MaTrangThai: form.getFieldValue("MaTrangThai"),
              MaGiangVien: form.getFieldValue("MaGiangVien"),
              NgayThucHien: form.getFieldValue("NgayThucHien"),
              NgayKetThuc: form.getFieldValue("NgayKetThuc"),
            },
          },
        };
        await Post(obj);
      } else {
        obj = {
          url: `/de-tais/${id}`,
          data: {
            data: {
              TenDeTai: form.getFieldValue("TenDeTai"),
              MaNganh: form.getFieldValue("MaNganh"),
              GhiChu: form.getFieldValue("GhiChu"),
              MaTrangThai: form.getFieldValue("MaTrangThai"),
              MaGiangVien: form.getFieldValue("MaGiangVien"),
              NgayThucHien: form.getFieldValue("NgayThucHien"),
              NgayKetThuc: form.getFieldValue("NgayKetThuc"),
            },
          },
        };
        await Put(obj);
      }
      form.resetFields();
      handleGetAssignTopics();
      setVisible(false);
      return response;
    } catch (error) {
      console.error("Error faculyty:", error);
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
      title: "Tên giảng viên",
      dataIndex: "MaGiangVien",
      key: "MaGiangVien",
      width: 150,
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
      align: "center",
      width: 150,
      render: (text) => (
        <div>{dayjs(text, "YYYY-MM-DD").format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "NgayKetThuc",
      key: "NgayKetThuc",
      align: "center",
      width: 150,
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
                ? { background: "rgba(214, 162, 67, 0.20)", color: "#D6A243" }
                : text === "Đề xuất"
                ? { background: "rgba(34, 128, 255, 0.20)", color: "#2280FF" }
                : text === "Nghiệm thu cấp bộ môn"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Nghiệm thu cấp khoa"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Nghiệm thu cấp khoa"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "báo cáo cấp trường"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Kết thúc"
                ? { background: "rgba(255, 47, 47, 0.12)", color: "#FF2F2F" }
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
            onConfirm={() => handleDeleteStudentManagement(record)}
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
      MaGiangVien: lecturer.find(
        (item) => item.TenGiangVien === record.MaGiangVien
      )?.id,
      MaNganh: industry.find((item) => item.nganh === record.Ten_nganh)?.id,
      MaTrangThai: status.find(
        (item) => item.TenTrangThai === record.MaTrangThai
      )?.id,
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
        onOk={handlePostLecturersManagement}
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
                name="MaNganh"
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
              <Form.Item name="GhiChu" label="Thêm ghi chú">
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
                  format={"DD-MM-YYYY"}
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
                  options={status.map((item) => {
                    return {
                      label: item?.TenTrangThai,
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
                  options={lecturer.map((item) => {
                    console.log("lecturer", lecturer);
                    return {
                      label: item?.TenGiangVien,
                      value: item.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item name="KetQua" label="kết quả">
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

export default AssignTopics;
