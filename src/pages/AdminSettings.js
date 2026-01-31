import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setSettings(res.data.settings);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_URL}/api/admin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage("Settings updated successfully!");
      }
    } catch (err) {
      console.error("Error updating settings:", err);
      setMessage("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2>Admin Settings</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={settings.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={settings.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={settings.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={settings.address}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Settings"}
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
};

export default AdminSettings;
