import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { userIcon } from "../../assets";

const Header = () => {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", background: '#2993d1' }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={'https://humg.edu.vn/Publishing_Resources/web/images/logo.png'} alt="Trường Mỏ" style={{ height: '70px' }} />
      </div>
      <div>
        <p style={{ color: "white", fontWeight: 600 }}>HỆ THỐNG QUẢN LÝ NGHIÊN CỨU KHOA HỌC SINH VIÊN</p>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px', fontWeight: 600 }}>
          <div style={{ color: "#0b4da3", display: 'flex', alignItems: 'center', gap: 8 }} >
            {/* <userIcon style={{marginRight: "5px"}}/> */}

            <div style={{ borderRadius: '100px', border: '2px solid #fff', overflow: 'hidden', width: 20, height: 20 }}><img src={userIcon} alt="" /></div>
            <Link style={{ color: "#0b4da3", fontSize:"14px" }}>Đăng xuất</Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
