import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateEmployee() {
  const { state } = useLocation();
  const { employee } = state || {}; // Extract the employee details from state
  const navigate = useNavigate(); // For navigation after update

  const [formData, setFormData] = useState({
    first_name: employee?.first_name || "",
    last_name: employee?.last_name || "",
    email: employee?.email || "",
    position: employee?.position || "",
    department: employee?.department || "",
    salary: employee?.salary || "",
  });

  if (!employee) {
    return <p>No employee data found for updating.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("You must be logged in to update employee details.");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/v1/emp/employees/${employee._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update employee details.");
      }

      alert("Employee updated successfully!");
      navigate("/employeeList"); // Redirect to the employee list after updating
    } catch (error) {
      console.error("Error updating employee:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-light bg-transparent p-3 rounded" style={{ backgroundColor: "rgba(128, 0, 128, 0.6)" }}>
        Update Employee
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Save Changes
        </button>
      </form>
    </div>
  );
}
