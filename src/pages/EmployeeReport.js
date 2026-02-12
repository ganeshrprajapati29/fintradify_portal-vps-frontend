import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFileAlt, FaPlus, FaList, FaCheckCircle, FaClock, FaEye } from "react-icons/fa";

const EmployeeReport = () => {
  const [reports, setReports] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Other",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL =
    (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
    "https://steelblue-sheep-699352.hostingersite.com";
  const token = localStorage.getItem("token");

  // Fetch reports
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/employee/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.reports || []);
    } catch (err) {
      console.error("❌ Fetch reports error:", err);
      setError("Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      setError("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(`${API_URL}/api/employee/reports`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ title: "", description: "", type: "Other" });
      setShowForm(false);
      fetchReports();
    } catch (err) {
      console.error("❌ Submit report error:", err);
      setError(err.response?.data?.msg || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Reviewed":
        return <FaCheckCircle className="text-success" />;
      case "Closed":
        return <FaEye className="text-info" />;
      default:
        return <FaClock className="text-warning" />;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      Submitted: "badge bg-warning text-dark",
      Reviewed: "badge bg-success",
      Closed: "badge bg-info",
    };
    return classes[status] || "badge bg-secondary";
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <FaFileAlt className="me-2" />
              Reports
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              <FaPlus className="me-2" />
              New Report
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Form */}
          {showForm && (
            <div className="card mb-4">
              <div className="card-header">
                <h5>Submit Report</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Type</label>
                      <select
                        className="form-select"
                        value={formData.type}
                        onChange={(e) =>
                          setFormData({ ...formData, type: e.target.value })
                        }
                      >
                        <option value="Performance">Performance</option>
                        <option value="Incident">Incident</option>
                        <option value="Feedback">Feedback</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Submit Report"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Reports List */}
          <div className="card">
            <div className="card-header">
              <h5>
                <FaList className="me-2" />
                My Reports
              </h5>
            </div>
            <div className="card-body">
              {loading && reports.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : reports.length === 0 ? (
                <div className="text-center py-5">
                  <FaFileAlt size={48} className="text-muted mb-3" />
                  <p className="text-muted">No reports found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((item) => (
                        <tr key={item._id}>
                          <td>
                            {new Date(item.submittedAt).toLocaleDateString()}
                          </td>
                          <td>{item.title}</td>
                          <td>
                            <span className="badge bg-info">{item.type}</span>
                          </td>
                          <td>
                            {item.description.length > 50
                              ? `${item.description.substring(0, 50)}...`
                              : item.description}
                          </td>
                          <td>
                            <span className={getStatusBadge(item.status)}>
                              {getStatusIcon(item.status)} {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeReport;
