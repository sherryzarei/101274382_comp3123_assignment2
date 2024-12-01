import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      alert("Password and Confirm Password must be the same");
      return;
    }

    try {
      const res = await axios.post("https://one01274382-comp3123-assignment2-1.onrender.com/api/v1/user/signup", {
        username,
        email,
        password,
      });

      if (res.status === 201 && res.data) {
        localStorage.setItem("valid", true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("id", res.data.id);
        alert("Registration Successful");
        navigate("/login");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div
            className="card shadow"
            style={{ backgroundColor: "rgba(128, 0, 128, 0.1)" }}
          >
            <div className="card-body">
              <h2
                className="card-title text-center bg-transparent p-2 rounded"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.6)",
                  color: "black",
                }}
              >
                Sign Up
              </h2>
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password <sup>*</sup>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Sign Up
                </button>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account?</p>
                <button
                  className="btn btn-link text-primary"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
