import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChartBar, FaDownload, FaCalendarAlt } from "react-icons/fa";

const SuperAdminReports = () => {
  const [reports, setReports] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalEmployees: 0,
    totalTasks: 0,
    totalLeaves: 0,
    totalMessages: 0,
    activeUsers: 0,
    completedTasks: 0,
    pendingLeaves: 0,
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/superadmin/reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.reports || reports);
    } catch (err) {
      console.error("❌ Fetch Reports Error:", err);
      alert("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/superadmin/reports/download`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'system-report.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("❌ Download Report Error:", err);
      alert("Failed to download report");
    }
  };

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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
          margin-bottom: 35px;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(3, 105, 161, 0.08) 100%);
          padding: 32px;
          border-radius: 16px;
          text-align: center;
          color: #333;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(2, 132, 199, 0.1);
          border: 2px solid rgba(2, 132, 199, 0.15);
          backdrop-filter: blur(10px);
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(2, 132, 199, 0.2);
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(3, 105, 161, 0.15) 100%);
        }

        .stat-card h5 {
          margin: 0 0 16px;
          font-size: 0.85rem;
          font-weight: 800;
          color: #0284c7;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .stat-card h3 {
          margin: 0;
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn {
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.9rem;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #fff;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(2, 132, 199, 0.4);
        }

        .loading {
          text-align: center;
          padding: 40px;
          color: #0284c7;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .report-actions {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
        }
      `}</style>

      <div className="content-header">
        <h2>Reports & Analytics</h2>
        <p>View system statistics and download reports.</p>
      </div>

      {loading ? (
        <div className="loading">Loading reports...</div>
      ) : (
        <>
          <div className="content-card">
            <div className="stats-grid">
              <div className="stat-card">
                <h5>Total Users</h5>
                <h3>{reports.totalUsers}</h3>
              </div>
              <div className="stat-card">
                <h5>Total Admins</h5>
                <h3>{reports.totalAdmins}</h3>
              </div>
              <div className="stat-card">
                <h5>Total Employees</h5>
                <h3>{reports.totalEmployees}</h3>
              </div>
              <div className="stat-card">
                <h5>Total Tasks</h5>
                <h3>{reports.totalTasks}</h3>
              </div>
              <div className="stat-card">
                <h5>Total Leaves</h5>
                <h3>{reports.totalLeaves}</h3>
              </div>
              <div className="stat-card">
                <h5>Total Messages</h5>
                <h3>{reports.totalMessages}</h3>
              </div>
              <div className="stat-card">
                <h5>Active Users</h5>
                <h3>{reports.activeUsers}</h3>
              </div>
              <div className="stat-card">
                <h5>Completed Tasks</h5>
                <h3>{reports.completedTasks}</h3>
              </div>
              <div className="stat-card">
                <h5>Pending Leaves</h5>
                <h3>{reports.pendingLeaves}</h3>
              </div>
            </div>
          </div>

          <div className="report-actions">
            <button className="btn" onClick={handleDownloadReport}>
              <FaDownload /> Download Report
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default SuperAdminReports;
