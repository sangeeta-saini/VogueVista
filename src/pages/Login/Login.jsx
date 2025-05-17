import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); // Reset errors before submission

    try {
      const res = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });

      const userId = res.data._id;

      localStorage.setItem("user_id", userId);

      navigate("/"); // Navigate to home on success
    } catch (err) {
      if (err.response && err.response.data.message) {
        const msg = err.response.data.message;
        // Update error state based on the message from the server
        if (msg.email) {
          setError({ email: msg.email });
        } else if (msg.password) {
          setError({ password: msg.password });
        } else {
          setError({ general: msg });
        }
      } else {
        setError({ general: "Server error. Please try again later." });
      }
    }
  };

  // Clear error messages when user changes the email or password
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError((prevState) => ({ ...prevState, email: null })); // Clear email error
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError((prevState) => ({ ...prevState, password: null })); // Clear password error
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="container-3">
        <div className="login">
          <h3>LOGIN</h3>
        </div>
        <div className="input-container-2">
          <div className="email">
            <h4 className="login-head">Email</h4>
            <input
              className="email-box"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <div className="error">{error.email}</div>}
          </div>
          <div className="password">
            <h4 className="login-head">Password</h4>
            <input
              className="password-box"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <div className="error">{error.password}</div>}
          </div>

          {error.general && <div className="error-msg">{error.general}</div>}

          <div className="login-btn">
            <button className="sign-btn" type="submit">
              Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
