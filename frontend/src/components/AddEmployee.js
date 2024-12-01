import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AddEmployee() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    position: "",
    salary: "",
    date_of_joining: "",
    department: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please login to add a new employee.");
        return;
      }

      const response = await fetch(
        "http://localhost:3000/api/v1/emp/employees",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create employee.");
      }

      alert("Employee added successfully!");
      navigate("/employeeList");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert(`Failed to add employee: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-light bg-transparent p-3 rounded" style={{ backgroundColor: "rgba(128, 0, 128, 0.6)" }}>
        Add New Employee
      </h1>

      {/* Back and Home buttons */}
      <div className="d-flex justify-content-start mb-4">
        <button className="btn btn-secondary btn-sm me-2" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="btn btn-primary btn-sm" onClick={() => navigate("/employeeList")}>
          Home
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow" style={{ backgroundColor: "rgba(128, 0, 128, 0.1)" }}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">Position:</label>
          <input
            type="text"
            className="form-control"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">Salary:</label>
          <input
            type="number"
            className="form-control"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_of_joining" className="form-label">Date of Joining:</label>
          <input
            type="date"
            className="form-control"
            id="date_of_joining"
            name="date_of_joining"
            value={formData.date_of_joining}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="department" className="form-label">Department:</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Add Employee
        </button>
      </form>
    </div>
  );
}
