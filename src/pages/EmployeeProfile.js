import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./EmployeeProfile.css";

const API_URL =
  (process.env.REACT_APP_API_URL &&
    process.env.REACT_APP_API_URL.trim()) ||
  "https://steelblue-sheep-699352.hostingersite.com";

const EmployeeProfile = () => {
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔒 StrictMode duplicate call prevention
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/api/employee/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error(
          "❌ Fetch profile error:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  // ✅ Safe image URL builder
  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    const base = API_URL.replace(/\/$/, "");
    const cleanPath = imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
    return `${base}${cleanPath}`;
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  if (!profile) return null;

  const safeName = profile.name || "Employee";

  return (
    <div className="container my-5 employee-profile">
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* Banner */}
        <div className="profile-banner text-white p-4">
          <h2 className="fw-bold mb-0">Employee Profile</h2>
          <p className="mb-0 text-white-50">
            Personal & Professional Details
          </p>
        </div>

        {/* Main */}
        <div className="card-body p-4">
          <div className="row g-4 align-items-center">
            {/* Left */}
            <div className="col-md-4 text-center">
              {profile.image ? (
                <img
                  src={getImageUrl(profile.image)}
                  alt={`${safeName}'s Profile`}
                  className="rounded-circle profile-img shadow"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-avatar.png";
                  }}
                />
              ) : (   
                <div className="avatar-placeholder shadow">
                  {safeName.charAt(0).toUpperCase()}
                </div>
              )}
              <h4 className="mt-3 fw-bold">{safeName}</h4>
              <p className="text-muted">{profile.position || "—"}</p>
              <span className="badge bg-success px-3 py-2">Active</span>
            </div>

            {/* Right */}
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-sm-6">
                  <small className="text-muted">Employee ID</small>
                  <h6 className="fw-semibold">
                    {profile.employeeId || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Email</small>
                  <h6 className="fw-semibold">{profile.email || "—"}</h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Department</small>
                  <h6 className="fw-semibold">
                    {profile.department || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Salary</small>
                  <h6 className="fw-semibold">
                    ₹{profile.salary || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Join Date</small>
                  <h6 className="fw-semibold">
                    {profile.joinDate
                      ? new Date(profile.joinDate).toLocaleDateString()
                      : "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Role</small>
                  <h6 className="fw-semibold text-capitalize">
                    {profile.role || "—"}
                  </h6> 
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer bg-light text-center py-2">
          <small className="text-muted">Profile loaded successfully</small>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
