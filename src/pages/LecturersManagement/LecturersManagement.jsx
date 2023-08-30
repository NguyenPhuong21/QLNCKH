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
  Popconfirm,
  Image,
} from "antd";
import { get, Post, Put, Delete } from "../../services/Api";

import customParseFormat from "dayjs/plugin/customParseFormat";

import dayjs from "dayjs";
import { QuestionCircleOutlined } from "@ant-design/icons";
import CustomButton from "../../components/CustomButton";
import { deleteIcon, editIcon } from "../../assets";

dayjs.extend(customParseFormat);
// import weekday from "dayjs/plugin/weekday";
// import localeData from "dayjs/plugin/localeData";

// dayjs.extend(weekday);
// dayjs.extend(localeData);

const LecturersManagement = () => {
  const [lecturers, setLecturers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("create");
  const [faculties, setFaculties] = useState([]);
  const [industry, setIndustry] = useState([]);
  const [id, setId] = useState(null);

  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  useEffect(() => {
    handleGetLecturersManagement();
    handleGetFacultyManagement();
    handleGetIndustryManagement();
  }, []);

  const handleGetLecturersManagement = async () => {
    try {
      let obj = {
        url: "/giang-viens?populate=khoa,nganh",
      };
      const response = await get(obj);
      const extractedData = response.data.map((item) => ({
        key: item.id,
        id: item.id,
        MaSoGiangVien: item.attributes?.MaSoGiangVien,
        TenGiangVien: item.attributes?.TenGiangVien,
        TrinhDo: item.attributes?.TrinhDo,
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

  const handlePostLecturersManagement = async () => {
    let obj;
    try {
      if (!id) {
        obj = {
          url: "/giang-viens",
          data: {
            data: {
              MaSoGiangVien: form.getFieldValue("MaSoGiangVien"),
              TenGiangVien: form.getFieldValue("TenGiangVien"),
              nganh: form.getFieldValue("nganh"),
              khoa: form.getFieldValue("khoa"),
              TrinhDo: form.getFieldValue("TrinhDo"),
            },
          },
        };
        await Post(obj);
      } else {
        obj = {
          url: `/giang-viens/${id}`,
          data: {
            data: {
              MaSoGiangVien: form.getFieldValue("MaSoGiangVien"),
              TenGiangVien: form.getFieldValue("TenGiangVien"),
              nganh: form.getFieldValue("nganh"),
              khoa: form.getFieldValue("khoa"),
              TrinhDo: form.getFieldValue("TrinhDo"),
            },
          },
        };
        await Put(obj);
      }
      form.resetFields();
      handleGetLecturersManagement();
      setVisible(false);
    } catch (error) {
      console.error("Error faculyty:", error);
    }
  };

  const handleDeleteLecturersManagement = async (record) => {
    let obj = {
      url: `/giang-viens/${record.id}`,
    };
    const res = await Delete(obj);
    if (res.status == "SUCCESS") {
      notification.success({
        message: "Đã xóa thành công",
        duration: 3,
      });
    }
    handleGetLecturersManagement();
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Mã giảng viên",
      dataIndex: "MaSoGiangVien",
      key: "MaSoGiangVien",
    },
    {
      title: "Tên giảng viên",
      dataIndex: "TenGiangVien",
      key: "TenGiangVien",
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
      title: "Trình độ",
      dataIndex: "TrinhDo",
      key: "TrinhDo",
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
            title="Xác nhận xóa giảng viên:"
            description={record.TenGiangVien}
            icon={<QuestionCircleOutlined />}
            onConfirm={() => handleDeleteLecturersManagement(record)}
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
      nganh: industry.find((item) => item.Ten_nganh === record.Ten_nganh)?.id,
      khoa: faculties.find((item) => item.Ten_khoa === record.Ten_khoa)?.id,
    };
    form.setFieldsValue(editData);
    setId(record.id);
    showModal();
  };

  return (
    <div>
      <div className="heading">Quản lý giảng viên</div>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: 16 }}>
        <Button type="primary" onClick={showModal}>
          Thêm giảng viên
        </Button>
      </div>
      <Table columns={columns} dataSource={lecturers} rowKey="id" />

      <Modal
        visible={visible}
        title="Thêm/sửa giảng viên"
        onCancel={handleCancel}
        onOk={handlePostLecturersManagement}
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
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default LecturersManagement;
