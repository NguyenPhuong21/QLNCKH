import React, { useEffect, useState  } from "react";
import { useHistory } from "react-router-dom";
import local from "../../services/local";

const Login = () => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jwtToken, setJwtToken] = useState("");
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
      local.set('token', data.jwt)
      history.push("/")
      setJwtToken(data.jwt);
      setErrorMessage("");
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errorMessage && <p>{errorMessage}</p>}
      {jwtToken && (
        <div>
          <p>Login successful!</p>
          <p>JWT Token: {jwtToken}</p>
        </div>
      )}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
