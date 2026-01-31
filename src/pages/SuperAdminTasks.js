import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTasks, FaSearch, FaEye, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const SuperAdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/superadmin/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("❌ Fetch Tasks Error:", err);
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await axios.delete(`${API_URL}/api/superadmin/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(res.data.msg || "Deleted successfully");
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Delete Task Error:", err);
      alert(err.response?.data?.msg || "Failed to delete task");
    }
  };

  const safeSearch = search.toLowerCase();
  const filteredTasks = tasks.filter((t) =>
    [t.title, t.description, t.assignedTo?.username, t.assignedBy?.username]
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

        .task-info strong {
          color: #333;
          font-size: 1.08rem;
          display: block;
          margin-bottom: 8px;
        }

        .task-info small {
          color: #94a3b8;
          display: block;
          margin-top: 6px;
          font-size: 0.86rem;
        }

        .task-info em {
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

        .badge.bg-warning {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
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

        .btn-outline-primary {
          background: transparent;
          color: #0284c7;
          border: 2px solid #0284c7;
        }

        .btn-outline-primary:hover {
          background: rgba(2, 132, 199, 0.1);
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
        <h2>Tasks</h2>
        <p>View and manage all tasks in the system.</p>
      </div>

      <div className="content-card">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, description, assigned to, or assigned by..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="result-count">Found {filteredTasks.length} task(s)</p>

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : filteredTasks.length > 0 ? (
          <ul className="list-group">
            {filteredTasks.map((task) => (
              <li key={task._id} className="list-group-item">
                <div className="task-info">
                  <strong>{task.title}</strong>
                  <small>Assigned to: {task.assignedTo?.username} | By: {task.assignedBy?.username}</small>
                  <em>Due: {new Date(task.dueDate).toLocaleDateString()}</em>
                  {task.status === "completed" ? (
                    <span className="badge bg-success">● Completed</span>
                  ) : task.status === "in-progress" ? (
                    <span className="badge bg-warning">● In Progress</span>
                  ) : (
                    <span className="badge bg-secondary">● Pending</span>
                  )}
                </div>
                <div className="btn-group">
                  <button className="btn btn-outline-primary">
                    <FaEye /> View
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>No tasks found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SuperAdminTasks;
