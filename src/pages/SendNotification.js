import React, { useState, useEffect } from "react";
import { FaBell, FaPaperPlane, FaUsers, FaUser } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";

const SendNotification = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [notification, setNotification] = useState({
    subject: "",
    message: "",
    type: "general" // general or personal
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get("/api/admin/employees");
      setEmployees(response.data.employees || response.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to fetch employees");
    }
  };

  const handleEmployeeSelect = (employeeId) => {
    if (notification.type === "general") {
      // For general notifications, select all or none
      if (selectedEmployees.length === employees.length) {
        setSelectedEmployees([]);
      } else {
        setSelectedEmployees(employees.map(emp => emp._id));
      }
    } else {
      // For personal notifications, toggle individual selection
      setSelectedEmployees(prev =>
        prev.includes(employeeId)
          ? prev.filter(id => id !== employeeId)
          : [...prev, employeeId]
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      if (notification.type === "general") {
        // Send to all employees
        await axiosInstance.post("/api/notifications", {
          recipientId: "all",
          recipientName: "All Employees",
          subject: notification.subject,
          message: notification.message,
          type: "general"
        });
      } else {
        // Send to selected employees
        for (const employeeId of selectedEmployees) {
          const employee = employees.find(emp => emp._id === employeeId);
          if (employee) {
            await axiosInstance.post("/api/notifications", {
              recipientId: employee._id,
              recipientName: employee.name,
              subject: notification.subject,
              message: notification.message,
              type: "personal"
            });
          }
        }
      }

      setSuccess("Notification sent successfully!");
      setNotification({ subject: "", message: "", type: "general" });
      setSelectedEmployees([]);
    } catch (err) {
      console.error("Error sending notification:", err);
      setError("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  const handleTypeChange = (type) => {
    setNotification(prev => ({ ...prev, type }));
    setSelectedEmployees([]);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-primary text-white text-center">
          <FaBell className="me-2" />
          Send Notification
        </div>
        <div className="card-body">
          {success && (
            <div className="alert alert-success">{success}</div>
          )}
          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Notification Type</label>
              <div className="d-flex gap-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="general"
                    value="general"
                    checked={notification.type === "general"}
                    onChange={() => handleTypeChange("general")}
                  />
                  <label className="form-check-label" htmlFor="general">
                    <FaUsers className="me-1" />
                    Send to All Employees
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="personal"
                    value="personal"
                    checked={notification.type === "personal"}
                    onChange={() => handleTypeChange("personal")}
                  />
                  <label className="form-check-label" htmlFor="personal">
                    <FaUser className="me-1" />
                    Send to Specific Employees
                  </label>
                </div>
              </div>
            </div>

            {notification.type === "personal" && (
              <div className="mb-3">
                <label className="form-label">Select Employees</label>
                <div className="border rounded p-3" style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {employees.map(employee => (
                    <div key={employee._id} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`employee-${employee._id}`}
                        checked={selectedEmployees.includes(employee._id)}
                        onChange={() => handleEmployeeSelect(employee._id)}
                      />
                      <label className="form-check-label" htmlFor={`employee-${employee._id}`}>
                        {employee.name} ({employee.email})
                      </label>
                    </div>
                  ))}
                </div>
                <small className="text-muted">
                  {selectedEmployees.length} employee(s) selected
                </small>
              </div>
            )}

            <div className="mb-3">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                value={notification.subject}
                onChange={(e) => setNotification(prev => ({ ...prev, subject: e.target.value }))}
                required
                placeholder="Enter notification subject"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                className="form-control"
                id="message"
                rows="4"
                value={notification.message}
                onChange={(e) => setNotification(prev => ({ ...prev, message: e.target.value }))}
                required
                placeholder="Enter notification message"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || (notification.type === "personal" && selectedEmployees.length === 0)}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Sending...
                </>
              ) : (
                <>
                  <FaPaperPlane className="me-2" />
                  Send Notification
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendNotification;
