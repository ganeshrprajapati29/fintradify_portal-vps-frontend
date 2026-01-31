import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCog, FaSave, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const SuperAdminSettings = () => {
  const [settings, setSettings] = useState({
    companyName: "",
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
      const res = await axios.get(`${API_URL}/api/superadmin/settings`, {
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
      const res = await axios.put(`${API_URL}/api/superadmin/settings`, settings, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setMessage("Settings updated successfully!");
        setTimeout(() => setMessage(""), 3000);
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
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(to bottom right, #f0f9ff, #e0f2fe, #f0fdf4)",
      padding: "50px 20px" 
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        
        {/* Header Card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "30px 40px",
          marginBottom: "30px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e5e7eb"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div style={{
              width: "60px",
              height: "60px",
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <FaCog style={{ fontSize: "28px", color: "white" }} />
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                fontSize: "28px", 
                fontWeight: "700", 
                color: "#1e293b",
                marginBottom: "5px"
              }}>
                Super Admin Settings
              </h1>
              <p style={{ margin: 0, color: "#64748b", fontSize: "15px" }}>
                Configure your company information and preferences
              </p>
            </div>
          </div>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div style={{
            background: "white",
            borderRadius: "12px",
            padding: "18px 24px",
            marginBottom: "25px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            border: `2px solid ${message.includes("success") ? "#10b981" : "#ef4444"}`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            animation: "slideIn 0.3s ease-out"
          }}>
            {message.includes("success") ? (
              <FaCheckCircle style={{ fontSize: "22px", color: "#10b981", flexShrink: 0 }} />
            ) : (
              <FaExclamationCircle style={{ fontSize: "22px", color: "#ef4444", flexShrink: 0 }} />
            )}
            <span style={{ 
              color: message.includes("success") ? "#065f46" : "#991b1b",
              fontWeight: "500",
              fontSize: "15px"
            }}>
              {message}
            </span>
          </div>
        )}

        {/* Main Settings Card */}
        <div style={{
          background: "white",
          borderRadius: "16px",
          padding: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e5e7eb"
        }}>
          <form onSubmit={handleSave}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
              gap: "30px",
              marginBottom: "30px"
            }}>
              
              {/* Company Name Field */}
              <div style={{ gridColumn: "span 2" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaUser style={{ fontSize: "14px", color: "white" }} />
                  </div>
                  Company Name
                </label>
                <input
                  type="text"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  required
                  placeholder="Enter your company name"
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    backgroundColor: "#f9fafb"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#3b82f6";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>

              {/* Email Field */}
              <div>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaEnvelope style={{ fontSize: "14px", color: "white" }} />
                  </div>
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  required
                  placeholder="company@example.com"
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    backgroundColor: "#f9fafb"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#10b981";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>

              {/* Phone Field */}
              <div>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    background: "linear-gradient(135deg, #06b6d4, #0891b2)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaPhone style={{ fontSize: "14px", color: "white" }} />
                  </div>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="+91 1234567890"
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    backgroundColor: "#f9fafb"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#06b6d4";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>

              {/* Address Field */}
              <div style={{ gridColumn: "span 2" }}>
                <label style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "12px",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FaMapMarkerAlt style={{ fontSize: "14px", color: "white" }} />
                  </div>
                  Company Address
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows="4"
                  placeholder="Enter your complete address"
                  style={{
                    width: "100%",
                    padding: "14px 18px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "10px",
                    fontSize: "15px",
                    outline: "none",
                    transition: "all 0.2s ease",
                    backgroundColor: "#f9fafb",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6";
                    e.target.style.backgroundColor = "white";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.backgroundColor = "#f9fafb";
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb"
            }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 32px",
                  background: loading ? "#cbd5e1" : "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: loading ? "none" : "0 4px 12px rgba(59, 130, 246, 0.3)"
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
                  }
                }}
              >
                <FaSave style={{ fontSize: "16px" }} />
                {loading ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SuperAdminSettings;