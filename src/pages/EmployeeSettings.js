import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaCog,
  FaSave,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const EmployeeSettings = () => {
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const token = localStorage.getItem("token");
  const API_URL =
    process.env.REACT_APP_API_URL?.trim() ||
    "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchSettings();
    // eslint-disable-next-line
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/employee/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.success) {
        setSettings(res.data.settings);
      }
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setMessage({
        type: "danger",
        text: "Failed to load settings. Please try again.",
      });
    }
  };

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({});

    try {
      const res = await axios.put(
        `${API_URL}/api/employee/settings`,
        settings,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.success) {
        setMessage({
          type: "success",
          text: "Settings updated successfully ✔",
        });
      } else {
        setMessage({
          type: "danger",
          text: res.data?.msg || "Update failed",
        });
      }
    } catch (error) {
      console.error("❌ Save error:", error);
      setMessage({
        type: "danger",
        text: error.response?.data?.msg || "Server error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-9 col-xl-8">
          <div className="card border-0 shadow-lg rounded-4">
            {/* HEADER */}
            <div className="card-header bg-gradient bg-info text-white rounded-top-4 py-3">
              <div className="d-flex align-items-center">
                <FaCog size={22} className="me-2" />
                <h5 className="mb-0 fw-semibold">Employee Settings</h5>
              </div>
            </div>

            {/* BODY */}
            <div className="card-body p-4">
              {message?.text && (
                <div
                  className={`alert alert-${message.type} alert-dismissible fade show`}
                  role="alert"
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSave}>
                {/* PERSONAL INFO */}
                <h6 className="fw-bold mb-3 text-secondary">
                  Personal Information
                </h6>

                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <FaUser className="me-2 text-info" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={settings.name}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter your name"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <FaEnvelope className="me-2 text-info" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={settings.email}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter email"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <FaPhoneAlt className="me-2 text-info" />
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={settings.phone}
                      onChange={handleChange}
                      className="form-control form-control-lg"
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label fw-semibold">
                      <FaMapMarkerAlt className="me-2 text-info" />
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                      className="form-control"
                      rows="3"
                      placeholder="Enter full address"
                    ></textarea>
                  </div>
                </div>

                {/* ACTION */}
                <div className="mt-5 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg px-4"
                    disabled={loading}
                  >
                    <FaSave className="me-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* FOOT NOTE */}
          <p className="text-center text-muted mt-3 small">
            Keep your profile updated for better communication.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSettings;
