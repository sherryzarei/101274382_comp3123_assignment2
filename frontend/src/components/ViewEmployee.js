import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ViewEmployee() {
  const { state } = useLocation();
  const { employee } = state || {};
  const navigate = useNavigate();

  if (!employee) {
    return (
      <p className="text-center text-danger mt-4">
        No employee data found.
      </p>
    );
  }

  return (
    <div className="container mt-4">
      <h1 className="text-center text-light bg-transparent p-3 rounded" style={{ backgroundColor: "rgba(128, 0, 128, 0.6)" }}>
        View Employee Details
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

      {/* Employee Details */}
      <div className="bg-light p-4 rounded shadow" style={{ backgroundColor: "rgba(128, 0, 128, 0.1)" }}>
        <p>
          <strong>First Name:</strong> {employee.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {employee.last_name}
        </p>
        <p>
          <strong>Email:</strong> {employee.email}
        </p>
        <p>
          <strong>Position:</strong> {employee.position || "N/A"}
        </p>
        <p>
          <strong>Department:</strong> {employee.department || "N/A"}
        </p>
        <p>
          <strong>Salary:</strong> {employee.salary || "N/A"}
        </p>
        <p>
          <strong>Date of Joining:</strong> {employee.date_of_joining ? new Date(employee.date_of_joining).toLocaleDateString() : "N/A"}
        </p>
      </div>
    </div>
  );
}
