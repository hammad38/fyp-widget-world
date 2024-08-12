import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          <div className="field">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
