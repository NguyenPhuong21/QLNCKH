import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import local from "../../services/local";
import {
  banner,
  googleIcon,
  facebookIcon,
  appleIcon,
  HUMGlogo,
} from "../../assets/index";
import "./login.css";

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [isForgot, setIsForgot] = useState(false);

  useEffect(() => {
    checkTokenExists();
  }, []);

  const checkTokenExists = () => {
    let token = local.get("token");
    if (token) {
      return history.push("/");
    }
  };
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: username, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      }
      const data = await response.json();
      local.set("token", data.jwt);
      local.set("user", data.user);
      history.push("/");
      setJwtToken(data.jwt);
      setErrorMessage("");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };
  const handleForward = async () => {};

  return (
    <div className="container">
      <div className="content">
        <div className="banner">
          <div className="desc">
            <h2>Quản lý</h2>
            <h3>Nghiêm cứu khoa học sinh viên</h3>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s,
            </p>
          </div>
          <div>
            <img src={banner} alt="" />
          </div>
        </div>
        <div className="form-login">
          <h3>
            Welcome to <span>HUMG-NCKH</span>
          </h3>
          <p>{isForgot ? "Lấy lại mật khẩu" : "Đăng nhập"}</p>
          {!isForgot && (
            <div className="socials">
              <button>
                <img src={googleIcon} />
                Đăng nhập với Google
              </button>
              <button>
                <img src={facebookIcon} />
              </button>
              <button>
                <img src={appleIcon} />
              </button>
            </div>
          )}
          {isForgot ? (
            <div className="form-group">
              <input type="text" placeholder="Nhập Email xác thực" />
            </div>
          ) : (
            <>
              <div className="form-group">
                <label>Tên đăng nhập</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </>
          )}
          {isForgot ? (
            <p className="forget-pwd" onClick={() => setIsForgot(false)}>
              Đã có tài khoản?
            </p>
          ) : (
            <p className="forget-pwd" onClick={() => setIsForgot(true)}>
              Quên mật khẩu?
            </p>
          )}
          {errorMessage && !isForgot && <p>{errorMessage}</p>}
          {jwtToken && !isForgot && (
            <div>
              <p>Login successful!</p>
              <p>JWT Token: {jwtToken}</p>
            </div>
          )}
          {isForgot ? (
            <button onClick={handleForward} className="btn-login">
              Tiếp tục
            </button>
          ) : (
            <button onClick={handleLogin} className="btn-login">
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
