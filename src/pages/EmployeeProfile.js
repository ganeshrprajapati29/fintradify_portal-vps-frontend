import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../utils/axiosInstance";
import "./EmployeeProfile.css";

const API_URL =
  (process.env.REACT_APP_API_URL &&
    process.env.REACT_APP_API_URL.trim()) ||
  "https://steelblue-sheep-699352.hostingersite.com";

const EmployeeProfile = ({ isEmbedded = false }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // 🔒 StrictMode duplicate call prevention
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/employee/me");
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
  }, []);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        accountNumber: profile.accountNumber || "",
        bankName: profile.bankName || "",
      });
    }
  }, [profile]);

  // ✅ Safe image URL builder
  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    // If it's already a full URL (e.g., Cloudinary), return as is
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      return imgPath;
    }
    // Otherwise, construct local URL
    const base = API_URL.replace(/\/$/, "");
    const cleanPath = imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
    return `${base}${cleanPath}`;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMessage({ type: "", text: "" });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      accountNumber: profile.accountNumber || "",
      bankName: profile.bankName || "",
    });
    setImageFile(null);
    setMessage({ type: "", text: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSave = async () => {
    setUpdateLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setMessage({ type: "error", text: "Name and Email are required and cannot be empty." });
      setUpdateLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name.trim());
      formDataToSend.append("email", formData.email.trim());
      formDataToSend.append("phone", formData.phone.trim());
      formDataToSend.append("address", formData.address.trim());
      formDataToSend.append("accountNumber", formData.accountNumber.trim());
      formDataToSend.append("bankName", formData.bankName.trim());

      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const res = await axiosInstance.put("/api/employee/me", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile(res.data.user);
      setIsEditing(false);
      setImageFile(null);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      console.error("❌ Update profile error:", err.response?.data || err.message);
      setMessage({ type: "error", text: err.response?.data?.msg || "Failed to update profile" });
    } finally {
      setUpdateLoading(false);
    }
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
    <div className={`container my-5 employee-profile ${isEmbedded ? 'embedded' : ''}`}>
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
        {/* Banner */}
        <div className="profile-banner text-white p-4">
          <h2 className="fw-bold mb-0">Employee Profile</h2>
          <p className="mb-0 text-white-50">
            Personal & Professional Details
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mx-4 mt-3`}>
            {message.text}
          </div>
        )}

        {/* Main */}
        <div className="card-body p-4">
          <div className="row g-4 align-items-center">
            {/* Left */}
            <div className="col-md-4 text-center">
              {isEditing ? (
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="form-control mb-3"
                  />
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      className="rounded-circle profile-img shadow mb-3"
                    />
                  ) : profile.image ? (
                    <img
                      src={getImageUrl(profile.image)}
                      alt={`${safeName}'s Profile`}
                      className="rounded-circle profile-img shadow mb-3"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/default-avatar.png";
                      }}
                    />
                  ) : (
                    <div className="avatar-placeholder shadow mb-3">
                      {safeName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>

            {/* Right */}
            <div className="col-md-8">
              <div className="row g-3">
                <div className="col-sm-6">
                  <small className="text-muted">Username</small>
                  <h6 className="fw-semibold">
                    {profile.username || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Name</small>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <h6 className="fw-semibold">{profile.name || "—"}</h6>
                  )}
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Email</small>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <h6 className="fw-semibold">{profile.email || "—"}</h6>
                  )}
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Phone</small>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <h6 className="fw-semibold">{profile.phone || "—"}</h6>
                  )}
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Address</small>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <h6 className="fw-semibold">{profile.address || "—"}</h6>
                  )}
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Account Number</small>
                  {isEditing ? (
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <h6 className="fw-semibold">{profile.accountNumber || "—"}</h6>
                  )}
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Bank Name</small>
                  {isEditing ? (
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    <h6 className="fw-semibold">{profile.bankName || "—"}</h6>
                  )}
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Company</small>
                  <h6 className="fw-semibold">
                    {profile.company || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Employee ID</small>
                  <h6 className="fw-semibold">
                    {profile.employeeId || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Department</small>
                  <h6 className="fw-semibold">
                    {profile.department || "—"}
                  </h6>
                </div>
                <div className="col-sm-6">
                  <small className="text-muted">Position</small>
                  <h6 className="fw-semibold">
                    {profile.position || "—"}
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
          {isEditing ? (
            <div>
              <button
                className="btn btn-success me-2"
                onClick={handleSave}
                disabled={updateLoading}
              >
                {updateLoading ? "Saving..." : "Save"}
              </button>
              <button
                className="btn btn-secondary"
                onClick={handleCancel}
                disabled={updateLoading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={handleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
