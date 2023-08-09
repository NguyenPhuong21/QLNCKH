import React from "react";
import { Layout, Row, Col } from "antd";
import {
  DesktopOutlined,
  TeamOutlined,
  BookOutlined,
  UserOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";

const { Content } = Layout;

const Dashboard = () => {
  return (
    <Layout>
      <div className="heading">Thống kê chung</div>
      <Content
        style={{
          padding: "20px",
          background: "#fff",
          border: "1px solid #ccc",
        }}
      >
        <p style={{ fontWeight: 500, marginBottom: 24, fontSize: 20 }}>
          Đại hội nghiên cứu khoa học lần thứ 36 Đại học Mỏ-Địa chất
        </p>
        <Row gutter={[16, 16]}>
          <Col span={4}  style={{ padding: 12}}>
            <div style={{ textAlign: "center", padding: 24, background: '#eee', borderRadius: 8 }}>
              <TeamOutlined
                style={{ fontSize: "36px", marginBottom: "10px" }}
              />
              <p>200</p>
              <p style={{ fontWeight: 600 }}>Sinh viên</p>
            </div>
          </Col>
          <Col span={4}  style={{ padding: 12}}>
            <div style={{ textAlign: "center", padding: 24, padding: 24, background: '#eee', borderRadius: 8 }}>
              <TeamOutlined
                style={{ fontSize: "36px", marginBottom: "10px" }}
              />
              <p>12</p>
              <p style={{ fontWeight: 600 }}>Khoa</p>
            </div>
          </Col>
          <Col span={4} style={{ padding: 12}}>
            <div style={{ textAlign: "center", padding: 24, background: '#eee', borderRadius: 8  }}>
              <BookOutlined
                style={{ fontSize: "36px", marginBottom: "10px" }}
              />
              <p>36</p>
              <p style={{ fontWeight: 600 }}>Bộ môn</p>
            </div>
          </Col>
          <Col span={4} style={{ padding: 12}}>
            <div style={{ textAlign: "center", padding: 24, background: '#eee', borderRadius: 8 }}>
              <UsergroupAddOutlined
                style={{ fontSize: "36px", marginBottom: "10px" }}
              />
              <p>500</p>
              <p style={{ fontWeight: 600 }}>Giảng viên hướng dẫn</p>
            </div>
          </Col>
          <Col span={4} style={{ padding: 12}}>
            <div style={{ textAlign: "center", padding: 24, background: '#eee', borderRadius: 8}}>
              <UserOutlined
                style={{ fontSize: "36px", marginBottom: "10px" }}
              />
              <p>100</p>
              <p style={{ fontWeight: 600 }}>Đề tài</p>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
