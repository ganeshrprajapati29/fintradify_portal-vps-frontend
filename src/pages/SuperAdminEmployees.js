import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaSearch, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";

const SuperAdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/superadmin/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.error("❌ Fetch Employees Error:", err);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEmployeeStatus = async (employee) => {
    try {
      const newStatus = !employee.isActive;
      const res = await axios.patch(
        `${API_URL}/api/superadmin/employees/${employee._id}/status`,
        { isActive: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedEmployee = res.data.employee;
      setEmployees(employees.map((e) => (e._id === employee._id ? updatedEmployee : e)));
      alert(res.data.msg || "Status updated");
    } catch (err) {
      console.error("❌ Toggle Employee Status Error:", err);
      alert(err.response?.data?.msg || "Failed to update employee status");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const res = await axios.delete(`${API_URL}/api/superadmin/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.msg || "Deleted successfully");
      setEmployees(employees.filter((e) => e._id !== id));
    } catch (err) {
      console.error("❌ Delete Employee Error:", err);
      alert(err.response?.data?.msg || "Failed to delete employee");
    }
  };

  const safeSearch = search.toLowerCase();
  const filteredEmployees = employees.filter((e) =>
    [e.username, e.email, e.company]
      .map((x) => x?.toLowerCase() || "")
      .some((v) => v.includes(safeSearch))
  );

  return (
    <>
      <style jsx>{`
        .content-header {
          margin-bottom: 35px;
        }

        .content-header h2 {
          font-size: 2.3rem;
          font-weight: 800;
          color: #0284c7;
          margin-bottom: 12px;
        }

        .content-header p {
          color: #64748b;
          font-size: 0.98rem;
          font-weight: 500;
        }

        .content-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 32px;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(2, 132, 199, 0.12);
          margin-bottom: 35px;
          border: 2px solid rgba(2, 132, 199, 0.1);
        }

        .search-container {
          margin-bottom: 25px;
          position: relative;
        }

        .search-container input {
          width: 100%;
          padding: 14px 15px 14px 48px;
          border: 2px solid rgba(2, 132, 199, 0.2);
          border-radius: 12px;
          font-size: 0.96rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.95);
        }

        .search-container input:focus {
          outline: none;
          border-color: #0284c7;
          box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15);
          background: #fff;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #0284c7;
          font-size: 1.1rem;
        }

        .list-group {
          list-style: none;
          margin-top: 25px;
        }

        .list-group-item {
          background: rgba(255, 255, 255, 0.95);
          border: 2px solid rgba(2, 132, 199, 0.1);
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .list-group-item:hover {
          box-shadow: 0 8px 30px rgba(2, 132, 199, 0.15);
          transform: translateX(6px);
          border-color: #0284c7;
          background: #fff;
        }

        .employee-info strong {
          color: #333;
          font-size: 1.08rem;
          display: block;
          margin-bottom: 8px;
        }

        .employee-info small {
          color: #94a3b8;
          display: block;
          margin-top: 6px;
          font-size: 0.86rem;
        }

        .employee-info em {
          color: #0284c7;
          font-style: normal;
          font-weight: 700;
          display: block;
          margin-top: 4px;
          font-size: 0.92rem;
        }

        .badge {
          display: inline-block;
          padding: 5px 13px;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 700;
          margin-left: 10px;
        }

        .badge.bg-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
        }

        .badge.bg-secondary {
          background: rgba(2, 132, 199, 0.1);
          color: #0284c7;
        }

        .btn-group {
          display: flex;
          gap: 10px;
        }

        .btn {
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 0.85rem;
        }

        .btn-outline-warning {
          background: transparent;
          color: #f59e0b;
          border: 2px solid #f59e0b;
        }

        .btn-outline-warning:hover {
          background: rgba(245, 158, 11, 0.1);
          transform: translateY(-2px);
        }

        .btn-outline-success {
          background: transparent;
          color: #10b981;
          border: 2px solid #10b981;
        }

        .btn-outline-success:hover {
          background: rgba(16, 185, 129, 0.1);
          transform: translateY(-2px);
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #fff;
          border: none;
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 50px 20px;
          color: #64748b;
        }

        .empty-state p {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #0284c7;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .result-count {
          color: #64748b;
          font-size: 0.92rem;
          margin-bottom: 15px;
          font-weight: 700;
        }
      `}</style>

      <div className="content-header">
        <h2>Manage Employees</h2>
        <p>View and manage all employees in the system.</p>
      </div>

      <div className="content-card">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by username, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="result-count">Found {filteredEmployees.length} employee(s)</p>

        {loading ? (
          <div className="loading">Loading employees...</div>
        ) : filteredEmployees.length > 0 ? (
          <ul className="list-group">
            {filteredEmployees.map((employee) => (
              <li key={employee._id} className="list-group-item">
                <div className="employee-info">
                  <strong>{employee.username}</strong>
                  {employee.isActive ? (
                    <span className="badge bg-success">● Active</span>
                  ) : (
                    <span className="badge bg-secondary">● Disabled</span>
                  )}
                  <small>{employee.email}</small>
                  <em>{employee.company}</em>
                </div>
                <div className="btn-group">
                  <button
                    className={`btn ${
                      employee.isActive ? "btn-outline-warning" : "btn-outline-success"
                    }`}
                    onClick={() => handleToggleEmployeeStatus(employee)}
                  >
                    {employee.isActive ? (
                      <>
                        <FaToggleOn /> Disable
                      </>
                    ) : (
                      <>
                        <FaToggleOff /> Enable
                      </>
                    )}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteEmployee(employee._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>No employees found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SuperAdminEmployees;
