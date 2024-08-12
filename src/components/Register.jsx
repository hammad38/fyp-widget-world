import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "./Header";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    // Username validation
    if (!username || username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await axios.post(
        "https://nodejs-fyp-production.up.railway.app/register",
        { username, email, password }
      );
      navigate("/login");
      alert("User registered successfully!");
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="wrapper-container">
      <Header />
      <div className="wrapper">
        <div className="title">Register</div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="field">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
            <label>Username</label>
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </div>
          <div className="field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
            <label>Email Address</label>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
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
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <div className="field">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
