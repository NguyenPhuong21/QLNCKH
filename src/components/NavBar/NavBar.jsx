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
} from "@ant-design/icons";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const { SubMenu } = Menu;

const NavBar = () => {
  return (
    <div className="App">
      <Menu mode="inline" style={{ width: "100%" }}>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="/Dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="congress" icon={<ClusterOutlined />}>
          <Link to="/Congress">Đại hội</Link>
        </Menu.Item>
        <SubMenu key="topic" title="Đề Tài" icon={<FileOutlined />}>
          <Menu.Item key="assignTopics" icon={<RightOutlined />}>
          <Link to="/AssignTopics">Phân công đề tài</Link>
          </Menu.Item>
          <Menu.Item key="boardAssignment" icon={<RightOutlined />}>
          <Link to="/BoardAssignment">Phân công hội đồng</Link>
          </Menu.Item>
          <Menu.Item key="extend" icon={<RightOutlined />}>
          <Link to="/Extend"> Gia hạn</Link>
          </Menu.Item>
          <Menu.Item key="submitReport" icon={<RightOutlined />}>
          <Link to="/SubmitReport">Nộp báo cáo</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="viewAssessment" icon={<SolutionOutlined />}>
          Xem đánh giá
        </Menu.Item>
        <Menu.Item key="topicList" icon={<FileOutlined />}>
          Danh sách đề tài
        </Menu.Item>
        <Menu.Item key="listCouncils" icon={<TeamOutlined />}>
          Danh sách hội đồng
        </Menu.Item>
        <Menu.Item key="acceptance" icon={<CheckOutlined />}>
          Nghiệm thu
        </Menu.Item>
        <Menu.Item key="result" icon={<CheckCircleOutlined />}>
          kết quả
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default NavBar;
