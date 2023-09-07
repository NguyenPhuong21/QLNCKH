import { DownOutlined, SmileOutlined, LogoutOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { userIcon } from "../../assets";
import { get, Post, Put, Delete } from "../../services/Api";
import { Dropdown } from "antd";

const Header = () => {
  const [user, setUser] = useState(null);
  const handleLogOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  const handleGetUser = async () => {
    try {
      let obj = {
        url: "/users/me?populate=*",
      };
      const response = await get(obj);
      setUser(response);
    } catch (error) {
      console.error("Error status:", error);
    }
  };
  const items = [
    {
      key: "1",
      label: <p>Thông tin tài khoản</p>,
      icon: <SmileOutlined />,
    },
    {
      key: "2",
      label: <p onClick={handleLogOut}>Đăng xuất</p>,
      icon: <LogoutOutlined />,
    },
  ];
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px",
        background: "#2993d1",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={"https://humg.edu.vn/Publishing_Resources/web/images/logo.png"}
          alt="Trường Mỏ"
          style={{ height: "70px" }}
        />
      </div>
      <div>
        <p style={{ color: "white", fontWeight: 600 }}>
          HỆ THỐNG QUẢN LÝ NGHIÊN CỨU KHOA HỌC SINH VIÊN
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "4px",
            fontWeight: 600,
          }}
        >
          <div
            style={{
              color: "#0b4da3",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                borderRadius: "100px",
                border: "2px solid #fff",
                overflow: "hidden",
                width: 20,
                height: 20,
              }}
            >
              <img src={userIcon} alt="" />
            </div>
            {!user ? (
              <p
                style={{ color: "#0b4da3", fontSize: "14px" }}
                onClick={handleLogOut}
              >
                Đăng xuất
              </p>
            ) : (
              <Dropdown
                menu={{
                  items,
                }}
              >
                <p>{user.sinh_vien.HoTen}</p>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
