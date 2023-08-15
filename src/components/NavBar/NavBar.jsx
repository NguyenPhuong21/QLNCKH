import React from "react";
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
import { Divider } from 'antd';

const { SubMenu } = Menu;

const NavBar = () => {
  return (
    <div className="App">
      <Divider type="horizontal" style={{ color: 'red' }} />
      <p>MAIN</p>
      <Menu mode="inline" style={{ width: "100%" }}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/Dashboard">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="congress" icon={<ClusterOutlined />}>
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
        </SubMenu>

        {/* 
        <Menu.Item key="topicList" icon={<FileOutlined />}>
          Danh sách đề tài
        </Menu.Item>
        <Menu.Item key="listCouncils" icon={<TeamOutlined />}>
          Danh sách hội đồng
        </Menu.Item>
        <Menu.Item key="acceptance" icon={<CheckOutlined />}>
          Nghiệm thu
        </Menu.Item> */}
        {/* <Menu.Item key="result" icon={<CheckCircleOutlined />}>
          kết quả
        </Menu.Item> */}
      </Menu>
      <Divider type="horizontal" style={{ color: 'red', marginTop:'30px' }} />
      <p>Setting</p>
    </div>
  );
};

export default NavBar;
