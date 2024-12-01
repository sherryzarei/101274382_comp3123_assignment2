import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchPosition, setSearchPosition] = useState(""); // State for search input
  const navigate = useNavigate(); // Hook for navigation

  // Fetch employees on component mount
  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }

      const response = await fetch("http://localhost:3000/api/v1/emp/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch employees: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear the token
    navigate("/login"); // Redirect to the login page
  };

  const handleView = (employee) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to update employee details.");
      return;
    }

    navigate(`/view-employee/${employee._id}`, { state: { employee } });
  };

  const handleDelete = async (employeeId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No token found. Please login.");
        return;
      }

      const response = await fetch(`http://localhost:3000/api/v1/emp/employees?eid=${employeeId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to delete employee: ${response.status}`);
      }

      alert("Employee deleted successfully!");
      setEmployees(employees.filter((employee) => employee._id !== employeeId));
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert(`Failed to delete employee: ${error.message}`);
    }
  };

  const handleUpdate = (employee) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login to update employee details.");
      return;
    }

    navigate(`/update-employee/${employee._id}`, { state: { employee } });
  };

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  // Filter employees by position
  const filteredEmployees = employees.filter((employee) =>
    employee.position?.toLowerCase().includes(searchPosition.toLowerCase())
  );

  return (
    <div className="container my-9">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-center text-light bg-transparent rounded p-3" style={{ backgroundColor: "rgba(128, 0, 128, 0.6)" }}>
          Employee List
        </h1>
        <div>
  <button className="btn btn-primary btn-sm" onClick={handleAddEmployee}>
    Add New Employee
  </button>
  <button className="btn btn-danger btn-sm ms-2" onClick={handleLogout}>
    Logout
  </button>
</div>
      </div>
      <div className="my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Position"
          value={searchPosition}
          onChange={(e) => setSearchPosition(e.target.value)}
        />
      </div>
      {filteredEmployees.length > 0 ? (
        <table className="table table-striped table-hover table-bordered mt-3" style={{ backgroundColor: "rgba(128, 0, 128, 0.2)" }}>
          <thead className="text-light" style={{ backgroundColor: "rgba(128, 0, 128, 0.8)" }}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{employee.position || "N/A"}</td>
                <td>
                  <button className="btn btn-info me-2" onClick={() => handleView(employee)}>
                    View
                  </button>
                  <button className="btn btn-warning me-2" onClick={() => handleUpdate(employee)}>
                    Update
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-light" style={{ backgroundColor: "rgba(128, 0, 128, 0.4)" }}>No employees found.</p>
      )}
    </div>
  );
}
