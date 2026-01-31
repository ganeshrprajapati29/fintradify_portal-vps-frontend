import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendarAlt, FaSearch, FaEye, FaCheck, FaTimes } from "react-icons/fa";

const SuperAdminLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/superadmin/leaves`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(res.data.leaves || []);
    } catch (err) {
      console.error("❌ Fetch Leaves Error:", err);
      alert("Failed to load leaves");
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLeave = async (id) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/superadmin/leaves/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedLeave = res.data.leave;
      setLeaves(leaves.map((l) => (l._id === id ? updatedLeave : l)));
      alert(res.data.msg || "Leave approved");
    } catch (err) {
      console.error("❌ Approve Leave Error:", err);
      alert(err.response?.data?.msg || "Failed to approve leave");
    }
  };

  const handleRejectLeave = async (id) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/superadmin/leaves/${id}/reject`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedLeave = res.data.leave;
      setLeaves(leaves.map((l) => (l._id === id ? updatedLeave : l)));
      alert(res.data.msg || "Leave rejected");
    } catch (err) {
      console.error("❌ Reject Leave Error:", err);
      alert(err.response?.data?.msg || "Failed to reject leave");
    }
  };

  const safeSearch = search.toLowerCase();
  const filteredLeaves = leaves.filter((l) =>
    [l.reason, l.employee?.username, l.approvedBy?.username]
      .map((x) => x?.toLowerCase() || "")
      .some((v) => v.includes(safeSearch))
  );

  return (
    <>
      <style jsx>{`
        .content-header {
          margin-bottom: 35px;
        }

        .content-header h2 {
          font-size: 2.3rem;
          font-weight: 800;
          color: #0284c7;
          margin-bottom: 12px;
        }

        .content-header p {
          color: #64748b;
          font-size: 0.98rem;
          font-weight: 500;
        }

        .content-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 32px;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(2, 132, 199, 0.12);
          margin-bottom: 35px;
          border: 2px solid rgba(2, 132, 199, 0.1);
        }

        .search-container {
          margin-bottom: 25px;
          position: relative;
        }

        .search-container input {
          width: 100%;
          padding: 14px 15px 14px 48px;
          border: 2px solid rgba(2, 132, 199, 0.2);
          border-radius: 12px;
          font-size: 0.96rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.95);
        }

        .search-container input:focus {
          outline: none;
          border-color: #0284c7;
          box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15);
          background: #fff;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #0284c7;
          font-size: 1.1rem;
        }

        .list-group {
          list-style: none;
          margin-top: 25px;
        }

        .list-group-item {
          background: rgba(255, 255, 255, 0.95);
          border: 2px solid rgba(2, 132, 199, 0.1);
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.3s ease;
        }

        .list-group-item:hover {
          box-shadow: 0 8px 30px rgba(2, 132, 199, 0.15);
          transform: translateX(6px);
          border-color: #0284c7;
          background: #fff;
        }

        .leave-info strong {
          color: #333;
          font-size: 1.08rem;
          display: block;
          margin-bottom: 8px;
        }

        .leave-info small {
          color: #94a3b8;
          display: block;
          margin-top: 6px;
          font-size: 0.86rem;
        }

        .leave-info em {
          color: #0284c7;
          font-style: normal;
          font-weight: 700;
          display: block;
          margin-top: 4px;
          font-size: 0.92rem;
        }

        .badge {
          display: inline-block;
          padding: 5px 13px;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 700;
          margin-left: 10px;
        }

        .badge.bg-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
        }

        .badge.bg-warning {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #fff;
        }

        .badge.bg-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #fff;
        }

        .badge.bg-secondary {
          background: rgba(2, 132, 199, 0.1);
          color: #0284c7;
        }

        .btn-group {
          display: flex;
          gap: 10px;
        }

        .btn {
          border: none;
          border-radius: 10px;
          padding: 10px 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 0.85rem;
        }

        .btn-outline-primary {
          background: transparent;
          color: #0284c7;
          border: 2px solid #0284c7;
        }

        .btn-outline-primary:hover {
          background: rgba(2, 132, 199, 0.1);
          transform: translateY(-2px);
        }

        .btn-success {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: #fff;
          border: none;
        }

        .btn-success:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: #fff;
          border: none;
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 50px 20px;
          color: #64748b;
        }

        .empty-state p {
          font-size: 1.05rem;
          font-weight: 600;
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #0284c7;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .result-count {
          color: #64748b;
          font-size: 0.92rem;
          margin-bottom: 15px;
          font-weight: 700;
        }
      `}</style>

      <div className="content-header">
        <h2>Leave Requests</h2>
        <p>View and manage all leave requests in the system.</p>
      </div>

      <div className="content-card">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by reason, employee, or approver..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <p className="result-count">Found {filteredLeaves.length} leave request(s)</p>

        {loading ? (
          <div className="loading">Loading leave requests...</div>
        ) : filteredLeaves.length > 0 ? (
          <ul className="list-group">
            {filteredLeaves.map((leave) => (
              <li key={leave._id} className="list-group-item">
                <div className="leave-info">
                  <strong>{leave.employee?.username}</strong>
                  <small>Reason: {leave.reason}</small>
                  <em>From: {new Date(leave.startDate).toLocaleDateString()} - To: {new Date(leave.endDate).toLocaleDateString()}</em>
                  {leave.status === "approved" ? (
                    <span className="badge bg-success">● Approved</span>
                  ) : leave.status === "rejected" ? (
                    <span className="badge bg-danger">● Rejected</span>
                  ) : (
                    <span className="badge bg-warning">● Pending</span>
                  )}
                </div>
                <div className="btn-group">
                  {leave.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleApproveLeave(leave._id)}
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRejectLeave(leave._id)}
                      >
                        <FaTimes /> Reject
                      </button>
                    </>
                  )}
                  <button className="btn btn-outline-primary">
                    <FaEye /> View
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>No leave requests found.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SuperAdminLeaves;
