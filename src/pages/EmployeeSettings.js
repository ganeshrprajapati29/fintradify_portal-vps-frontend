import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCog, FaSave, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const EmployeeSettings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL?.trim() || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/employee/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setSettings(res.data.settings);
      }
    } catch (err) {
      console.error("❌ Fetch settings error:", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.put(`${API_URL}/api/employee/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage("Settings updated successfully!");
      } else {
        setMessage(res.data.msg || "Failed to update settings.");
      }
    } catch (err) {
      console.error("❌ Save settings error:", err);
      setMessage(err.response?.data?.msg || "Error updating settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-header bg-info text-white d-flex align-items-center">
          <FaCog className="me-2" />
          <h4 className="mb-0">Employee Settings</h4>
        </div>
        <div className="card-body">
          {message && (
            <div className={`alert ${message.includes("success") ? "alert-success" : "alert-danger"}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSave}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">
                  <FaUser className="me-1" /> Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.name}
                  onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FaEnvelope className="me-1" /> Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  <FaLock className="me-1" /> Phone
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">
                  <FaLock className="me-1" /> Address
                </label>
                <textarea
                  className="form-control"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows="3"
                />
              </div>
            </div>
            <div className="mt-4">
              <button type="submit" className="btn btn-success" disabled={loading}>
                <FaSave className="me-2" />
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSettings;
