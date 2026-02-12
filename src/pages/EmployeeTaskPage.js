import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EmployeeTaskPage.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://steelblue-sheep-699352.hostingersite.com";

export default function EmployeeTaskPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks/my-tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data?.success) setTasks(res.data.tasks);
    } catch (err) {
      console.error("❌ Fetch My Tasks Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/tasks/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("❌ Update Task Error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  // ✅ Badge renderer
  const badge = (value, type) => {
    let cls = "badge ";
    if (type === "priority") {
      cls +=
        value === "High"
          ? "badge-high"
          : value === "Medium"
          ? "badge-medium"
          : "badge-low";
    } else {
      cls +=
        value === "Completed"
          ? "badge-done"
          : value === "In Progress"
          ? "badge-progress"
          : "badge-pending";
    }
    return <span className={cls}>{value}</span>;
  };

  return (
    <div className="task-page container-fluid py-4">
      {/* HEADER */}
      <div className="task-header mb-4">
        <h2>My Tasks</h2>
        <p>Track and update your assigned tasks</p>
      </div>

      {/* CONTENT */}
      <div className="card task-card shadow-sm border-0">
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5 text-muted">
              Loading tasks...
            </div>
          ) : tasks.length > 0 ? (
            <div className="table-responsive">
              <table className="table align-middle task-table mb-0">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t._id}>
                      <td className="fw-semibold">{t.title}</td>
                      <td className="text-muted">
                        {t.description || "—"}
                      </td>
                      <td>{badge(t.priority, "priority")}</td>
                      <td>
                        {t.dueDate
                          ? new Date(t.dueDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td>{badge(t.status, "status")}</td>
                      <td>
                        <select
                          className="form-select form-select-sm status-select"
                          value={t.status}
                          onChange={(e) =>
                            updateStatus(t._id, e.target.value)
                          }
                        >
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <h6>No Tasks Assigned</h6>
              <p>You don’t have any tasks right now.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
