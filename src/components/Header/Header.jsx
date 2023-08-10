import React from "react";
import { userIcon } from "../../assets";

const Header = () => {

  const handleLogOut = () =>{
    localStorage.removeItem("token")
  }
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: '#2993d1' }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={'https://humg.edu.vn/Publishing_Resources/web/images/logo.png'} alt="Trường Mỏ" style={{ height: '70px' }} />
      </div>
      <div>
        <p style={{ color: "white", fontWeight: 600 }}>HỆ THỐNG QUẢN LÝ NGHIÊN CỨU KHOA HỌC SINH VIÊN</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', fontWeight: 600 }}>
          <div style={{ color: "#0b4da3", display: 'flex', alignItems: 'center', gap: 8 }} >
            <div style={{ borderRadius: '100px', border: '2px solid #fff', overflow: 'hidden', width: 20, height: 20 }}><img src={userIcon} alt="" /></div>
            <p style={{ color: "#0b4da3", fontSize:"14px"}}  onClick={handleLogOut} >Đăng xuất</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
