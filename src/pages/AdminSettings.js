import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./AdminSettings.css";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyLogo: null,
    slipFormat: {
      includeDeductions: false,
      includeAllowances: false,
      customFields: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);

  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch current settings
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${API_URL}/api/admin/settings`);
      if (res.data.success) {
        setSettings(res.data.settings);
        if (res.data.settings.companyLogo) {
          setLogoPreview(`${API_URL}/${res.data.settings.companyLogo}`);
        }
      }
    } catch (err) {
      console.error("❌ Fetch Settings Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSettings(prev => ({
        ...prev,
        companyLogo: file,
      }));
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSlipFormatChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      slipFormat: {
        ...prev.slipFormat,
        [name]: checked,
      },
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("companyName", settings.companyName);
      formData.append("companyAddress", settings.companyAddress);
      formData.append("companyPhone", settings.companyPhone);
      formData.append("companyEmail", settings.companyEmail);
      formData.append("slipFormat", JSON.stringify(settings.slipFormat));

      if (settings.companyLogo && typeof settings.companyLogo !== "string") {
        formData.append("companyLogo", settings.companyLogo);
      }

      const res = await axiosInstance.put(`${API_URL}/api/admin/settings`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("Settings updated successfully!");
        fetchSettings(); // Refresh settings
      }
    } catch (err) {
      console.error("❌ Save Settings Error:", err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="admin-settings">
      <div className="container">
        <h2 className="mb-4 text-primary">Admin Settings</h2>

        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Company Information</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="companyName"
                value={settings.companyName}
                onChange={handleInputChange}
                placeholder="Enter company name"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Company Email</label>
              <input
                type="email"
                className="form-control"
                name="companyEmail"
                value={settings.companyEmail}
                onChange={handleInputChange}
                placeholder="Enter company email"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Company Phone</label>
              <input
                type="tel"
                className="form-control"
                name="companyPhone"
                value={settings.companyPhone}
                onChange={handleInputChange}
                placeholder="Enter company phone"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Company Address</label>
              <textarea
                className="form-control"
                name="companyAddress"
                value={settings.companyAddress}
                onChange={handleInputChange}
                placeholder="Enter company address"
                rows="3"
              />
            </div>

            <div className="col-12">
              <label className="form-label">Company Logo</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleLogoChange}
              />
              {logoPreview && (
                <div className="mt-2">
                  <img
                    src={logoPreview}
                    alt="Company Logo Preview"
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </div>
              )}
            </div>
          </div>

          <hr className="my-4" />

          <h5 className="mb-3">Salary Slip Format</h5>

          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeDeductions"
                  name="includeDeductions"
                  checked={settings.slipFormat.includeDeductions}
                  onChange={handleSlipFormatChange}
                />
                <label className="form-check-label" htmlFor="includeDeductions">
                  Include Deductions Section
                </label>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="includeAllowances"
                  name="includeAllowances"
                  checked={settings.slipFormat.includeAllowances}
                  onChange={handleSlipFormatChange}
                />
                <label className="form-check-label" htmlFor="includeAllowances">
                  Include Allowances Section
                </label>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex justify-content-end">
            <button
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
