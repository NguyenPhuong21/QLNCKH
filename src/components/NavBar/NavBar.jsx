import React, { useEffect, useState } from "react";
import { Menu, Space } from "antd";
import {
  DashboardOutlined,
  FileOutlined,
  TeamOutlined,
  SolutionOutlined,
  RightOutlined,
  CheckOutlined,
  CheckCircleOutlined,
  ClusterOutlined,
  BarChartOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Divider } from "antd";
import local from "../../services/local";

const { SubMenu } = Menu;

const NavBar = () => {
  const [role, setRole] = useState("student");

  useEffect(() => {
    let user = local.get("user");
    fetchDataUser();
  }, []);

  const fetchDataUser = async () => {
    let res = await fetch("http://localhost:1337/api/users/me?populate=*", {
      headers: {
        Authorization: "Bearer " + local.get("token"),
      },
    });
    let result = await res.json();
    switch (result?.loai_tai_khoan?.TenLoaiTaiKhoan) {
      case "Sinh viên":
        setRole("student");
        break;
      case "Giảng viên":
        setRole("teacher");
        break;
      case "Bộ môn":
        setRole("bomon");
        break;
      case "Khoa":
        setRole("khoa");
        break;
      default:
        setRole("admin");
        break;
    }
  };

  return (
    <div className="App">
      <Divider type="horizontal" style={{ color: "red", marginTop: "2px"  }} />
      <Menu mode="inline" style={{ width: "100%" }}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/Dashboard">Trang chủ</Link>
        </Menu.Item>
        {NAVBAR[role].map((item, index) => {
          if (!item?.childs) {
            return (
              <Menu.Item key={index} icon={item?.icon}>
                <Link to={item?.url}>{item?.label}</Link>
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu key={item?.key} title={item?.label} icon={<BarChartOutlined />}>
                {item?.childs?.map((it, i) => {
                  return (
                    <Menu.Item key={it.key} icon={it?.icon}>
                      <Link to={it?.url}>{it?.label}</Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          }
        })}
        {/* <Menu.Item key="congress" icon={<ClusterOutlined />}>
          <Link to="/Congress">Đại hội</Link>
        </Menu.Item>
        <SubMenu key="topic" title="Đề Tài" icon={<BarChartOutlined />}>
          <Menu.Item key="assignTopics" icon={<RightOutlined />}>
            <Link to="/AssignTopics">Danh sách đề tài</Link>
          </Menu.Item>
          <Menu.Item key="progress" icon={<RightOutlined />}>
            <Link to="/Progress">Tiến độ</Link>
          </Menu.Item>
          <Menu.Item key="extend" icon={<RightOutlined />}>
            <Link to="/Extend">Gia hạn</Link>
          </Menu.Item>
          <Menu.Item key="subscribeTopic" icon={<RightOutlined />}>
            <Link to="/SubscribeTopic">Đăng kí đề tài</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="viewAssessment" icon={<SolutionOutlined />}>
          <Link to="/">Phân công</Link>
        </Menu.Item>
        <Menu.Item key="mark" icon={<CheckCircleOutlined />}>
          <Link to="/"> Chấm điểm</Link>
        </Menu.Item>
        <SubMenu key="Category" title="Danh mục" icon={<ContactsOutlined />}>
          <Menu.Item key="facultyManagement" icon={<RightOutlined />}>
            <Link to="/FacultyManagement">Quản lý khoa</Link>
          </Menu.Item>
          <Menu.Item key="industryManagement" icon={<RightOutlined />}>
            <Link to="/IndustryManagement">Quản lý ngành</Link>
          </Menu.Item>
          <Menu.Item key="lecturersManagement" icon={<RightOutlined />}>
            <Link to="/LecturersManagement">Quản lý giảng viên</Link>
          </Menu.Item>
          <Menu.Item key="studentManagement" icon={<RightOutlined />}>
            <Link to="/StudentManagement">Quản lý sinh viên</Link>
          </Menu.Item>
        </SubMenu> */}
      </Menu>
      {/* <Divider type="horizontal" style={{ color: "red", marginTop: "30px" }} /> */}
    </div>
  );
};

export default NavBar;

const NAVBAR = {
  admin: [
    {
      key: "congress",
      icon: <ClusterOutlined />,
      url: "/Congress",
      label: "Đại hội",
    },
    {
      key: "topic",
      icon: <BarChartOutlined />,
      label: "Đề tài",
      childs: [
        {
          key: "assignTopics",
          url: "/AssignTopics",
          icon: <RightOutlined />,
          label: "Danh sách đề tài",
        },
        {
          key: "progress",
          url: "/Progress",
          icon: <RightOutlined />,
          label: "Tiến độ",
        },
        {
          key: "extend",
          url: "/Extend",
          icon: <RightOutlined />,
          label: "Gia hạn",
        },
        {
          key: "subscribeTopic",
          url: "/SubscribeTopic",
          icon: <RightOutlined />,
          label: "Đăng kí đề tài",
        },
      ],
    },
    {
      label: "Phân công",
      key: "viewAssessment",
      url: "/",
      icon: <SolutionOutlined />,
    },
    {
      label: "Điểm",
      key: "mark",
      url: "/",
      icon: <SolutionOutlined />,
    },
    {
      label: "Danh mục",
      key: "category",
      icon: <ContactsOutlined />,
      childs: [
        {
          label: "Quản lý khoa",
          key: "facultyManagement",
          url: "/FacultyManagement",
          icon: <RightOutlined />,
        },
        {
          label: "Quản lý ngành",
          key: "industryManagement",
          url: "/IndustryManagement",
          icon: <RightOutlined />,
        },
        {
          label: "Quản lý giảng viên",
          key: "lecturersManagement",
          url: "/LecturersManagement",
          icon: <RightOutlined />,
        },
        {
          label: "Quản lý sinh viên",
          key: "studentManagement",
          url: "/StudentManagement",
          icon: <RightOutlined />,
        },
      ],
    },
  ],
  student: [
    {
      key: "subscribeTopic",
      url: "/SubscribeTopic",
      label: "Đăng ký đề tài",
      icon: <RightOutlined />,
    },
  ],
  bomon: [],
  khoa: [],
  teacher: [],
};