import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import local from "../../services/local";
import Header from "../Header";
import NavBar from "../NavBar";

const PrivateRouter = ({ children }) => {
  let history = useHistory();
  useEffect(() => {
    checkTokenExists();
  }, []);
  const checkTokenExists = () => {
    let token = local.get("token");
    if (!token) {
      return history.push("/login");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div
        style={{
          display: "flex",
          width: "100%",
          // overflow: "hidden",
          height: "100vh",
        }}
      >
        <div style={{ width: "240px", flexShrink: 0 }}>
          <NavBar />
        </div>
        <div
          style={{
            width: "calc(100% - 240px)",
            background: "#fff",
            padding: 5,
          }}
        >
          {children}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PrivateRouter;
