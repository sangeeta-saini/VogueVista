import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL;

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const validateForm = () => {
    let newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 7)
      newErrors.password = "Password must be at least 7 characters.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await axios.post(`${API_BASE_URL}/user/signup`, {
        name,
        email,
        password,
      });

      console.log(result.data);
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="login">
            <h3>SIGNUP</h3>
          </div>
          <div className="input-container">
            <div className="input-field">
              <div className="name">
                <h4 className="login-head">Name</h4>
                <input
                  className="name-box"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className="error">{errors.name}</div>}
              </div>
              <div className="email">
                <h4 className="login-head">Email</h4>
                <input
                  className="email-box"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className="error">{errors.email}</div>}
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
                {errors.password && (
                  <div className="error">{errors.password}</div>
                )}
              </div>
              <div className="login-btn">
                <button className="sign-btn" type="submit">
                  Register
                </button>
              </div>

              <div className="login-btn">
                <h4 className="login-head">Already have an account?</h4>
                <button
                  className="sign-btn"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Signup;
