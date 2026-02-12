import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import PunchInOut from "../components/PunchInOut";
import LeaveForm from "../components/LeaveForm";
import "./EmployeeDashboard.css";
import EmployeeTaskPage from "./EmployeeTaskPage";
import EmployeeForm from "./EmployeeForm";
import EmployeeProfile from "./EmployeeProfile";
import EmployeeAttendanceLeaveDashboard from "./EmployeeAttendanceLeaveDashboard";
import EmployeeSalarySlip from "./EmployeeSalarySlip";
import EmployeeReimbursement from "./EmployeeReimbursement";
import EmployeeReport from "./EmployeeReport";
import EmployeeTeamActive from "./EmployeeTeamActive";

// ✅ Icons
import {
  FaChartPie,
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaTasks,
  FaBug,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaMapMarkerAlt,
  FaUserCircle,
  FaBriefcase,
  FaChartLine,
  FaCalendarCheck,
  FaInbox,
  FaLock,
  FaBell,
  FaCog,
  FaFileInvoiceDollar,
  FaMoneyBillWave,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("adminId");
  const API_URL = process.env.REACT_APP_API_URL;

  const [allowed, setAllowed] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // 🔐 CHECK EMPLOYEE ACCESS
  useEffect(() => {
    const checkEmployeeAccess = async () => {
      try {
        if (!token) {
          setAllowed(false);
          return;
        }

        const res = await axios.get(`${API_URL}/api/employee/verify-access`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (
          (res.data?.allowed === true || res.data?.success === true) &&
          res.data?.role === "employee"
        ) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      } catch (err) {
        console.error("❌ Employee access check error:", err);
        setAllowed(false);
      }
    };

    if (role === "employee") {
      checkEmployeeAccess();
    } else {
      setAllowed(false);
    }
  }, [role, API_URL, token]);

  // 📊 FETCH ATTENDANCE
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/employee/attendance`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttendance(res.data?.attendance || []);
      } catch (err) {
        console.error("❌ Fetch attendance error:", err);
        setAllowed(false);
      }
    };

    if (allowed === true && token) {
      fetchAttendance();
    }
  }, [allowed, API_URL, token]);

  // 📊 FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/employee/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(res.data.user);
      } catch (err) {
        console.error("❌ Fetch profile error:", err);
      }
    };

    if (allowed === true && token) {
      fetchProfile();
    }
  }, [allowed, API_URL, token]);

  // 📍 LOCATION RENDER
  const renderLocation = (loc) => {
    if (!loc?.latitude || !loc?.longitude) return "—";
    return (
      <a
        href={`https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary fw-semibold"
        style={{ textDecoration: "none" }}
      >
        <FaMapMarkerAlt className="me-1" />
        {loc.latitude.toFixed(4)}, {loc.longitude.toFixed(4)}
      </a>
    );
  };

  // 📱 Get Active Tab Title
  const getActiveTabTitle = () => {
    const tabTitles = {
      dashboard: { icon: <FaChartPie />, label: "Dashboard" },
      profile: { icon: <FaUser />, label: "My Profile" },
      attendance: { icon: <FaClock />, label: "Attendance" },
      leave: { icon: <FaCalendarAlt />, label: "Leave Management" },
      task: { icon: <FaTasks />, label: "My Tasks" },
      salary: { icon: <FaFileInvoiceDollar />, label: "Salary Slip" },
      error: { icon: <FaBug />, label: "Error Reports" },
      notifications: { icon: <FaBell />, label: "Notifications" },
      settings: { icon: <FaCog />, label: "Settings" },
      reimbursement: { icon: <FaMoneyBillWave />, label: "Reimbursements" },
      report: { icon: <FaFileAlt />, label: "Reports" },
      teamactive: { icon: <FaUsers />, label: "Team Activity" },
    };
    return tabTitles[activeTab] || tabTitles.dashboard;
  };

  const currentTab = getActiveTabTitle();

  // ⏳ LOADING
  if (allowed === null) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
      </div>
    );
  }

  // ❌ UNAUTHORIZED
  if (allowed === false) {
    return (
      <div className="container mt-5 text-center">
        <div
          className="card shadow-lg border-0 p-5"
          style={{ maxWidth: "500px", margin: "100px auto" }}
        >
          <div className="card-body">
            <FaLock
              style={{
                fontSize: "4rem",
                color: "var(--danger)",
                marginBottom: "20px",
              }}
            />
            <h3 className="text-danger fw-bold mb-3">Unauthorized Access</h3>
            <p className="text-muted">You are not allowed to view this page.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => (window.location.href = "/")}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-dashboard">
      {/* ✅ Top Bar for Mobile */}
      <div className="topbar">
        <div className="topbar-brand">
          <FaBriefcase />
          <span>Corporate Employee Portal</span>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ✅ Sidebar Overlay for Mobile */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div className="d-flex">
        {/* ✅ Sidebar */}
        <div className={`sidebar ${sidebarOpen ? "show" : ""}`}>
          {/* Sidebar Header */}
          <div className="sidebar-header">
            <h4>
              <FaUserCircle />
              Corporate Portal
            </h4>
            <p className="sidebar-tagline">Empowering Workforce Excellence</p>
          </div>

          {/* Sidebar Navigation */}
          <div className="sidebar-nav">
            <div className="list-group list-group-flush">
              {[
                { key: "dashboard", icon: <FaChartPie />, label: "Dashboard" },
                { key: "profile", icon: <FaUser />, label: "Profile", path: "/employee/profile" },
                { key: "notifications", icon: <FaBell />, label: "Notifications" },
                { key: "settings", icon: <FaCog />, label: "Settings" },
                { key: "attendance", icon: <FaCalendarCheck />, label: "Attendance Records" },
                { key: "leave", icon: <FaCalendarAlt />, label: "Leave" },
                { key: "task", icon: <FaTasks />, label: "My Tasks" },
                { key: "salary", icon: <FaFileInvoiceDollar />, label: "Salary Slip" },
                { key: "reimbursement", icon: <FaMoneyBillWave />, label: "Reimbursements" },
                { key: "report", icon: <FaFileAlt />, label: "Reports" },
                { key: "teamactive", icon: <FaUsers />, label: "Team Activity" },
                { key: "error", icon: <FaBug />, label: "Employee Error" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`list-group-item nav-link ${
                    activeTab === tab.key ? "active" : ""
                  }`}
                  onClick={() => {
                    if (tab.path) {
                      navigate(tab.path);
                    } else {
                      setActiveTab(tab.key);
                    }
                    setSidebarOpen(false);
                  }}
                >
                  {tab.icon} <span>{tab.label}</span>
                </button>
              ))}

              <button
                className="list-group-item nav-link text-danger"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                {profile?.name ? profile.name.charAt(0).toUpperCase() : <FaUser />}
              </div>
              <div className="user-details">
                <h6>{profile?.name || "Employee"}</h6>
                <p>{currentTime.toLocaleTimeString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Main Content */}
        <div className="main-content">
          {/* Top Header Bar */}
          <div className="top-header-bar d-flex justify-content-end align-items-center p-3 bg-light border-bottom">
            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setActiveTab("notifications")}
                title="Notifications"
              >
                <FaBell />
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setActiveTab("settings")}
                title="Settings"
              >
                <FaCog />
              </button>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setActiveTab("profile")}
                title="Profile"
              >
                <FaUser />
              </button>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={handleLogout}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
            </div>
          </div>

          {/* Page Header */}
          <div className="page-header">
            <h1>
              {currentTab.icon} {currentTab.label}
            </h1>
            <ul className="breadcrumb">
              <li>Home</li>
              <li className="active">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </li>
            </ul>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              {/* Professional Header */}
              <div className="professional-header mb-4">
                <div className="header-content">
                  <div className="company-logo">
                    <FaBriefcase className="logo-icon" />
                    <div className="logo-text">
                      <h3>Corporate Solutions</h3>
                      <span>Employee Portal</span>
                    </div>
                  </div>
                  <div className="user-status">
                    <div className="status-indicator online">
                      <FaUserCircle />
                      <span>Active</span>
                    </div>
                    <div className="current-time">
                      {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Welcome Section */}
              <div className="card welcome-card mb-4">
                <div className="card-body">
                  <div className="welcome-content">
                    <div className="welcome-text">
                      <h2 className="card-title">
                        <FaChartLine />
                        Welcome back, {profile?.name || "Employee"}!
                      </h2>
                      <p className="card-subtitle">
                        Your productivity dashboard • Performance tracking • Team collaboration
                      </p>
                    </div>
                    <div className="welcome-stats">
                      <div className="quick-stat">
                        <span className="stat-number">{attendance.filter(rec => rec.punchIn && rec.punchOut).length}</span>
                        <span className="stat-label">Days Worked</span>
                      </div>
                      <div className="quick-stat">
                        <span className="stat-number">{attendance.filter(rec => !rec.punchOut).length}</span>
                        <span className="stat-label">Active Sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Stats Cards */}
              <div className="advanced-stats-grid mb-4">
                <div className="stat-card">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">
                      <FaClock />
                    </div>
                    <div className="stat-trend positive">+12%</div>
                  </div>
                  <div className="stat-card-value">
                    {attendance.filter(rec => rec.punchIn && rec.punchOut).length}
                  </div>
                  <div className="stat-card-label">Working Days</div>
                  <div className="stat-progress">
                    <div className="progress-bar" style={{width: '85%'}}></div>
                  </div>
                  <div className="stat-subtitle">This Month</div>
                </div>

                <div className="stat-card success">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">
                      <FaCalendarCheck />
                    </div>
                    <div className="stat-trend neutral">Active</div>
                  </div>
                  <div className="stat-card-value">
                    {attendance.filter(rec => !rec.punchOut).length}
                  </div>
                  <div className="stat-card-label">Active Sessions</div>
                  <div className="stat-progress">
                    <div className="progress-bar success" style={{width: '60%'}}></div>
                  </div>
                  <div className="stat-subtitle">Current Status</div>
                </div>

                <div className="stat-card warning">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="stat-trend neutral">Pending</div>
                  </div>
                  <div className="stat-card-value">
                    0
                  </div>
                  <div className="stat-card-label">Leave Requests</div>
                  <div className="stat-progress">
                    <div className="progress-bar warning" style={{width: '0%'}}></div>
                  </div>
                  <div className="stat-subtitle">Awaiting Approval</div>
                </div>

                <div className="stat-card danger">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">
                      <FaTasks />
                    </div>
                    <div className="stat-trend negative">-5%</div>
                  </div>
                  <div className="stat-card-value">
                    0
                  </div>
                  <div className="stat-card-label">Assigned Tasks</div>
                  <div className="stat-progress">
                    <div className="progress-bar danger" style={{width: '20%'}}></div>
                  </div>
                  <div className="stat-subtitle">Completion Rate</div>
                </div>

                <div className="stat-card info">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">
                      <FaChartLine />
                    </div>
                    <div className="stat-trend positive">+8%</div>
                  </div>
                  <div className="stat-card-value">
                    95
                  </div>
                  <div className="stat-card-label">Performance Score</div>
                  <div className="stat-progress">
                    <div className="progress-bar info" style={{width: '95%'}}></div>
                  </div>
                  <div className="stat-subtitle">Monthly Average</div>
                </div>

                <div className="stat-card secondary">
                  <div className="stat-card-header">
                    <div className="stat-card-icon">
                      <FaUser />
                    </div>
                    <div className="stat-trend neutral">Stable</div>
                  </div>
                  <div className="stat-card-value">
                    24
                  </div>
                  <div className="stat-card-label">Team Members</div>
                  <div className="stat-progress">
                    <div className="progress-bar secondary" style={{width: '100%'}}></div>
                  </div>
                  <div className="stat-subtitle">Active Colleagues</div>
                </div>
              </div>

              {/* Charts Section */}
              <div className="card">
                <div className="card-body">
                  <EmployeeAttendanceLeaveDashboard />
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="card">
              <div className="card-header">
                <FaUserCircle /> Employee Profile
              </div>
              <div className="card-body">
                <EmployeeProfile isEmbedded={true} />
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === "attendance" && (
            <div>
              {/* Punch In/Out Section */}
              <div className="card mb-4">
                <div className="card-header bg-primary text-white">
                  <FaClock className="me-2" /> Punch In/Out
                </div>
                <div className="card-body">
                  <PunchInOut />
                </div>
              </div>

              {/* Full Attendance Dashboard */}
              <EmployeeAttendanceLeaveDashboard />

              {/* Attendance History Table */}
              <div className="card mt-4">
                <div className="card-header bg-info text-white">
                  <FaCalendarCheck className="me-2" /> Attendance History
                </div>
                <div className="card-body">
                  {attendance.length === 0 ? (
                    <div className="text-center py-5">
                      <FaInbox
                        style={{
                          fontSize: "3rem",
                          color: "var(--gray-light)",
                          marginBottom: "16px",
                        }}
                      />
                      <p className="text-muted">No attendance records found.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-striped table-hover">
                        <thead className="table-dark">
                          <tr>
                            <th>Date</th>
                            <th>Punch In</th>
                            <th>In Location</th>
                            <th>Punch Out</th>
                            <th>Out Location</th>
                            <th>Total Hours</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendance.map((rec) => {
                            const punchInDate = rec.punchIn ? new Date(rec.punchIn) : null;
                            const punchOutDate = rec.punchOut ? new Date(rec.punchOut) : null;
                            const totalHours = punchInDate && punchOutDate ?
                              ((punchOutDate - punchInDate) / (1000 * 60 * 60)).toFixed(2) :
                              (punchInDate && !punchOutDate ? "Active" : "—");

                            return (
                              <tr key={rec._id}>
                                <td>
                                  {punchInDate ? punchInDate.toLocaleDateString("en-IN") : "—"}
                                </td>
                                <td>
                                  {punchInDate ? (
                                    <>
                                      <FaClock className="me-2 text-success" />
                                      {punchInDate.toLocaleTimeString("en-IN")}
                                    </>
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td>{renderLocation(rec.punchInLocation)}</td>
                                <td>
                                  {punchOutDate ? (
                                    <>
                                      <FaClock className="me-2 text-danger" />
                                      {punchOutDate.toLocaleTimeString("en-IN")}
                                    </>
                                  ) : (
                                    <span className="badge bg-warning text-dark">Active Session</span>
                                  )}
                                </td>
                                <td>{renderLocation(rec.punchOutLocation)}</td>
                                <td>
                                  {totalHours === "Active" ? (
                                    <span className="badge bg-primary">Active</span>
                                  ) : totalHours !== "—" ? (
                                    `${totalHours} hrs`
                                  ) : (
                                    "—"
                                  )}
                                </td>
                                <td>
                                  {rec.punchIn && rec.punchOut ? (
                                    <span className="badge bg-success">Completed</span>
                                  ) : rec.punchIn ? (
                                    <span className="badge bg-warning text-dark">In Progress</span>
                                  ) : (
                                    <span className="badge bg-secondary">—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Leave Tab */}
          {activeTab === "leave" && (
            <div className="card">
              <div className="card-header">
                <FaCalendarAlt /> Request Leave
              </div>
              <div className="card-body">
                <LeaveForm />
              </div>
            </div>
          )}

          {/* Task Tab */}
          {activeTab === "task" && (
            <div className="card">
              <div className="card-header">
                <FaTasks /> My Tasks
              </div>
              <div className="card-body">
                <EmployeeTaskPage />
              </div>
            </div>
          )}

          {/* Salary Tab */}
          {activeTab === "salary" && (
            <div className="card">
              <div className="card-body">
                <EmployeeSalarySlip />
              </div>
            </div>
          )}

          {/* Reimbursement Tab */}
          {activeTab === "reimbursement" && (
            <div className="card">
              <div className="card-body">
                <EmployeeReimbursement />
              </div>
            </div>
          )}

          {/* Report Tab */}
          {activeTab === "report" && (
            <div className="card">
              <div className="card-body">
                <EmployeeReport />
              </div>
            </div>
          )}

          {/* Team Active Tab */}
          {activeTab === "teamactive" && (
            <div className="card">
              <div className="card-body">
                <EmployeeTeamActive />
              </div>
            </div>
          )}



          {/* Error Tab */}
          {activeTab === "error" && (
            <div className="card">
              <div className="card-header">
                <FaBug /> Report Employee Error
              </div>
              <div className="card-body">
                <EmployeeForm />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corporate Footer */}
      <div className="corporate-footer">
        <div className="footer-content">
          <p>&copy; 2026 Corporate Employee Portal. All rights reserved.</p>
          <p>Empowering Workforce Excellence</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
