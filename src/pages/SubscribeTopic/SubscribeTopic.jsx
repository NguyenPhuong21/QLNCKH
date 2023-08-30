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
} from "antd";

const SubscribeTopic = () => {

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


  return (
    <div>
     
    </div>
  )
}

export default SubscribeTopic
