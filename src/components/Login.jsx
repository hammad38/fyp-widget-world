import React, { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://nodejs-fyp-production.up.railway.app/login",
        { email, password }
      );
      const userData = response.data;
      setAuthData(userData);
      if (
        !userData ||
        !userData.user ||
        typeof userData.user.isAdmin === "undefined"
      ) {
        throw new Error("Invalid response from server");
      }
      if (userData.user.isAdmin) {
        navigate("/Admin");
      } else {
        navigate("/");
      }
      alert("Login successful!");
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in");
    }
  };

  return (
    <div className="wrapper-container">
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
            <label>Email Address</label>
          </div>
          <div className="field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
            <label>Password</label>
          </div>
          <div className="content">
            <div className="checkbox">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
          </div>
          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <a href="#">Signup now</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
