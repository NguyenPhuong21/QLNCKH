import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Space,
  Select,
  Popconfirm,
  Image,
  notification,
} from "antd";
import CustomButton from "../../components/CustomButton";
import { deleteIcon, editIcon } from "../../assets";
import { get, Post, Put, Delete } from "../../services/Api";
import { QuestionCircleOutlined } from "@ant-design/icons";

const SubscribeTopic = () => {
  const [form] = Form.useForm();
  const [id, setId] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [status, setStatus] = useState([]);
  const [subscribes, setSubscribeTopics] = useState([]);
  const [student, setStudent] = useState([]);
  const [lecturer, setLecturer] = useState([]);
  const [topic, setTopic] = useState([]);

  const { TextArea } = Input;
  useEffect(() => {
    handleGetSubscribeTopic();
    handleGetLecturersManagement();
    handleGetStudentManagement();
    handleGetStatusManagement();
    handleGetAssignTopicsManagement();
  }, []);
  const handleGetSubscribeTopic = async () => {
    try {
      let obj = {
        url: "/dang-kies?populate=*",
      };
      const response = await get(obj);
      const subscribeTopicData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        MaSoSinhVien:
          item.attributes?.MaSoSinhVien?.data?.attributes?.MaSoSinhVien,
        MaGiangVien:
          item.attributes?.MaGiangVien?.data?.attributes?.TenGiangVien,
        GhiChu: item.attributes?.GhiChu,
        TrangThai: item.attributes?.TrangThai?.data?.attributes?.TenTrangThai,
      }));
      setSubscribeTopics(subscribeTopicData);
    } catch (error) {
      console.error("Error SubscribeTopic:", error);
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

  const handleGetStudentManagement = async () => {
    try {
      let obj = {
        url: "/sinh-viens",
      };
      const response = await get(obj);
      const studentData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        MaSoSinhVien: item.attributes?.MaSoSinhVien,
      }));
      setStudent(studentData);
    } catch (error) {
      console.error("Error Lecturer:", error);
    }
  };

  const handlePostLecturersManagement = async () => {
    let obj;
    try {
      if (!id) {
        obj = {
          url: "/dang-kies",
          data: {
            data: {
              nganh: form.getFieldValue("MaNganh"),
              GhiChu: form.getFieldValue("GhiChu"),
              TrangThai: form.getFieldValue("TrangThai"),
              MaGiangVien: form.getFieldValue("MaGiangVien"),
              MaSoSinhVien: form.getFieldValue("MaSoSinhVien"),
              LinkDeCuong: form.getFieldValue("LinkDeCuong"),
              de_tai: form.getFieldValue("de_tai"),
            },
          },
        };
        await Post(obj);
        notification.success({
          message: "Thêm đề tài thành công",
          duration: 3,
        });
      } else {
        obj = {
          url: `/dang-kies/${id}`,
          data: {
            data: {
              nganh: form.getFieldValue("MaNganh"),
              GhiChu: form.getFieldValue("GhiChu"),
              TrangThai: form.getFieldValue("TrangThai"),
              MaGiangVien: form.getFieldValue("MaGiangVien"),
              MaSoSinhVien: form.getFieldValue("MaSoSinhVien"),
              LinkDeCuong: form.getFieldValue("LinkDeCuong"),
              de_tai: form.getFieldValue("de_tai"),
            },
          },
        };
        await Put(obj);
        notification.success({
          message: "Sửa đề tài thành công",
          duration: 3,
        });
      }
      form.resetFields();
      handleGetSubscribeTopic();
      setVisible(false);
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handleGetStatusManagement = async () => {
    try {
      let obj = {
        url: "/de-tais",
      };
      const response = await get(obj);
      const topicData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        TenDeTai: item.attributes?.TenDeTai,
      }));
      setTopic(topicData);
    } catch (error) {
      console.error("Error status:", error);
    }
  };

  const handleGetAssignTopicsManagement = async () => {
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
      width: 220,
    },
    {
      title: "Tên giảng viên",
      dataIndex: "MaGiangVien",
      key: "MaGiangVien",
      width: 220,
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      key: "TrangThai",
      width: 220,
      align: "center",
      render: (text, record) => (
        <div className="status-custom">
          <span
            style={
              text === "Đang triển khai"
                ? { background: "rgba(214, 162, 67, 0.20)", color: "#D6A243" }
                : text === "Bắt đầu"
                ? { background: "rgba(34, 128, 255, 0.20)", color: "#2280FF" }
                : text === "Đợi phê duyệt"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Chưa đăng kí"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Đã đăng kí"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Gia hạn"
                ? { background: "rgba(255, 47, 47, 0.12)", color: "#FF2F2F" }
                : text === "Hủy bỏ"
                ? { background: "rgba(255, 47, 47, 0.12)", color: "#FF2F2F" }
                : text === "Đã nộp báo cáo"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
                : text === "Nghiệm thu"
                ? { background: "rgba(20, 128, 74, 0.12)", color: "#14804A" }
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
            description={record.MaSoSinhVien}
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
      MaSoSinhVien: student.find(
        (item) => item.MaSoSinhVien === record.MaSoSinhVien
      )?.id,
      MaGiangVien: lecturer.find(
        (item) => item.TenGiangVien === record.MaGiangVien
      )?.id,
      TrangThai: status.find((item) => item.TenTrangThai === record.TrangThai)
        ?.id,
      de_tai: topic.find((item) => item.TenDetai === record.de_tai)?.id,
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
      <Table
        columns={columns}
        dataSource={subscribes}
        rowKey="id"
        scroll={{ y: 620 }}
      />
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
                name="MaSoSinhVien"
                label="Mã số sinh viên"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng nhập vào mã số sinh viên",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn mã số sinh viên tương ứng"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={student.map((item) => {
                    return {
                      label: item?.MaSoSinhVien,
                      value: item.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
            <div style={{ width: "48%" }}>
              <Form.Item
                name="MaGiangVien"
                label="Chọn giảng viên"
                rules={[
                  {
                    required: true,
                    message: " Vui lòng giảng viên tương ứng",
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
                    return {
                      label: item?.TenGiangVien,
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
              <Form.Item name="LinkDeCuong" label="Link đề cương">
                <Input placeholder="Nhập vào link đề đề cương" />
              </Form.Item>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "48%" }}>
              <Form.Item
                label="Chọn trạng thái"
                name="TrangThai"
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
            <div style={{ width: "48%" }}>
              <Form.Item
                label="Chọn đề tài"
                name="de_tai"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn đề tài tương ứng",
                  },
                ]}
              >
                <Select
                  showSearch
                  style={{ width: "100%", marginBottom: 16 }}
                  placeholder="Chọn đề tài tương ứng"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={topic.map((item) => {
                    return {
                      label: item?.TenDeTai,
                      value: item.id,
                    };
                  })}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default SubscribeTopic;
