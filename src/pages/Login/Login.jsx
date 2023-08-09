import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import local from "../../services/local";

const Login = () => {
  let history = useHistory();
  useEffect(() => {
    checkTokenExists();
  }, []);

  const checkTokenExists = () => {
    let token = local.get("token");
    if (token) {
      return history.push("/");
    }
  };
  return <div>Login</div>;
};

export default Login;
