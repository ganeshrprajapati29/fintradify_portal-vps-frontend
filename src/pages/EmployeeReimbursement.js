import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMoneyBillWave, FaPlus, FaList, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const EmployeeReimbursement = () => {
  const [reimbursements, setReimbursements] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "Other",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL =
    (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
    "https://steelblue-sheep-699352.hostingersite.com";
  const token = localStorage.getItem("token");

  // Fetch reimbursements
  useEffect(() => {
    fetchReimbursements();
  }, []);

  const fetchReimbursements = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/employee/reimbursements`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReimbursements(res.data.reimbursements || []);
    } catch (err) {
      console.error("❌ Fetch reimbursements error:", err);
      setError("Failed to fetch reimbursements");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description.trim()) {
      setError("Amount and description are required");
      return;
    }

    if (parseFloat(formData.amount) <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(`${API_URL}/api/employee/reimbursements`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData({ amount: "", description: "", category: "Other" });
      setShowForm(false);
      fetchReimbursements();
    } catch (err) {
      console.error("❌ Submit reimbursement error:", err);
      setError(err.response?.data?.msg || "Failed to submit reimbursement");
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Approved":
        return <FaCheckCircle className="text-success" />;
      case "Rejected":
        return <FaTimesCircle className="text-danger" />;
      default:
        return <FaClock className="text-warning" />;
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      Pending: "badge bg-warning text-dark",
      Approved: "badge bg-success",
      Rejected: "badge bg-danger",
    };
    return classes[status] || "badge bg-secondary";
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <FaMoneyBillWave className="me-2" />
              Reimbursements
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              <FaPlus className="me-2" />
              New Request
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
                <h5>Submit Reimbursement Request</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Amount *</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                      >
                        <option value="Travel">Travel</option>
                        <option value="Medical">Medical</option>
                        <option value="Food">Food</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      rows="3"
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
                      {loading ? "Submitting..." : "Submit Request"}
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

          {/* Reimbursements List */}
          <div className="card">
            <div className="card-header">
              <h5>
                <FaList className="me-2" />
                My Reimbursement Requests
              </h5>
            </div>
            <div className="card-body">
              {loading && reimbursements.length === 0 ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : reimbursements.length === 0 ? (
                <div className="text-center py-5">
                  <FaMoneyBillWave size={48} className="text-muted mb-3" />
                  <p className="text-muted">No reimbursement requests found.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reimbursements.map((item) => (
                        <tr key={item._id}>
                          <td>
                            {new Date(item.submittedAt).toLocaleDateString()}
                          </td>
                          <td>${parseFloat(item.amount).toFixed(2)}</td>
                          <td>
                            <span className="badge bg-info">{item.category}</span>
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

export default EmployeeReimbursement;
