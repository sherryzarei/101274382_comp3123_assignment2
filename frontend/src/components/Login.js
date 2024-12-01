import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Submitting login...");
    let credentials = {
      email: email,
      password: password,
    };
    console.log("Credentials:", credentials);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/login",
        credentials
      );
      console.log("Response received:", res);
      if (res.status === 200) {
        localStorage.setItem("valid", true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("id", res.data.id);
        console.log("Login successful, navigating to home...");
        localStorage.setItem("accessToken", res.data.token);

        navigate("/EmployeeList");
      } else {
        console.log("Invalid credentials");
        localStorage.setItem("valid", false);
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ backgroundColor: "rgba(128, 0, 128, 0.1)" }}>
            <div className="card-body">
              <h2
                className="card-title text-center bg-transparent p-2 rounded"
                style={{ backgroundColor: "rgba(128, 0, 128, 0.6)", color: "black" }}
              >
                Login
              </h2>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <sup>*</sup>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password <sup>*</sup>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account?</p>
                <button className="btn btn-link text-primary" onClick={() => navigate("/")}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
