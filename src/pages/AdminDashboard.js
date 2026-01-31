import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

// ✅ Import Icons
import {
  FaUsers,
  FaUserPlus,
  FaCalendarCheck,
  FaFileInvoiceDollar,
  FaTasks,
  FaEnvelope,
  FaSignOutAlt,
  FaClipboardList,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimesCircle,
  FaArrowLeft
} from "react-icons/fa";

// ✅ Import child components
import CreateEmployee from "./CreateEmployee";
import EmployeeAttendance from "./EmployeeAttendance";
import SalarySlipPage from "./SalarySlipPage";
import AdminTaskPage from "./AdminTaskPage";
import AdminMessages from "./AdminMessages";
import AttendanceLeaveDashboard from "./AttendanceLeaveDashboard";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("attendanceGif");
  const [loading, setLoading] = useState(false);
  const [loadingLeaves, setLoadingLeaves] = useState(false);
  const [search, setSearch] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // ✅ Fetch Admin Profile
  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/api/admin/profile");
      setProfile(res.data.admin);
    } catch (err) {
      console.error("Profile error:", err);
    }
  };

  // ✅ Fetch Employees
  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/admin/employees");
      const data = res.data.employees || res.data;
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      console.error("Employees error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Leaves
  const fetchLeaves = async () => {
    setLoadingLeaves(true);
    try {
      const res = await axiosInstance.get("/api/admin/leaves");
      setLeaves(res.data.leaves || res.data);
    } catch (err) {
      console.error("Leaves error:", err);
      setLeaves([]);
    } finally {
      setLoadingLeaves(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchEmployees();
    fetchLeaves();
  }, []);

  // ✅ Delete Employee
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axiosInstance.delete(`/api/admin/employees/${id}`);
      const updated = employees.filter((e) => e._id !== id);
      setEmployees(updated);
      setFilteredEmployees(updated);
      alert("Employee deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete employee");
    }
  };

  // ✅ Leave Approve / Reject
  const handleLeaveAction = async (id, action) => {
    try {
      await axiosInstance.put(
        `/api/admin/leaves/${id}`,
        { status: action.toLowerCase() }
      );
      fetchLeaves();
      alert(`Leave ${action} successfully!`);
    } catch (err) {
      console.error("Leave action error:", err);
      alert(`Failed to ${action} leave`);
    }
  };

  // ✅ Search
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = employees.filter(
      (emp) =>
        emp.name?.toLowerCase().includes(value) ||
        emp.email?.toLowerCase().includes(value)
    );
    setFilteredEmployees(filtered);
  };

  // ✅ Edit Employee Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("employeeId", editEmployee.employeeId || "");
      formData.append("name", editEmployee.name || "");
      formData.append("email", editEmployee.email || "");
      formData.append("position", editEmployee.position || "");
      formData.append("salary", editEmployee.salary || "");
      formData.append("department", editEmployee.department || "");
      formData.append("joinDate", editEmployee.joinDate || "");

      await axiosInstance.put(
        `/api/admin/employees/${editEmployee._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Employee updated successfully!");
      setEditEmployee(null);
      fetchEmployees();
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update employee");
    }
  };

  // ✅ Get Status Color
  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'pending': return '#f0ad4e';
      case 'approved': return '#5cb85c';
      case 'rejected': return '#d9534f';
      case 'completed': return '#5cb85c';
      case 'in progress': return '#0275d8';
      default: return '#6c757d';
    }
  };

  // ✅ Inline CSS Styles
  const styles = `
    /* Reset & Base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .dashboard-wrapper {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%);
      display: flex;
    }
    
    /* Top Navbar */
    .top-navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 70px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(229, 231, 235, 0.8);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 30px;
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    }
    
    .nav-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .menu-toggle {
      display: none;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: #4a5568;
      cursor: pointer;
    }
    
    .dashboard-title {
      font-size: 1.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .nav-right {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    
    .admin-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 8px 16px;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .admin-profile:hover {
      background: rgba(244, 247, 254, 0.8);
    }
    
    .profile-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4F46E5, #06B6D4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }
    
    .profile-info h5 {
      font-size: 0.9rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 2px;
    }
    
    .profile-info p {
      font-size: 0.8rem;
      color: #718096;
    }
    
    /* Sidebar */
    .sidebar {
      width: 260px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-right: 1px solid rgba(229, 231, 235, 0.8);
      height: 100vh;
      position: fixed;
      left: 0;
      top: 70px;
      padding: 25px 20px;
      overflow-y: auto;
      z-index: 999;
      box-shadow: 2px 0 20px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    
    .sidebar-collapsed {
      transform: translateX(-100%);
    }
    
    .sidebar-header {
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 1px solid rgba(229, 231, 235, 0.8);
    }
    
    .sidebar-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #4a5568;
      margin-bottom: 8px;
    }
    
    .sidebar-company {
      font-size: 0.85rem;
      color: #718096;
      padding: 6px 12px;
      background: rgba(244, 247, 254, 0.8);
      border-radius: 8px;
      display: inline-block;
    }
    
    .nav-links {
      list-style: none;
      margin-bottom: 40px;
    }
    
    .nav-links li {
      margin-bottom: 8px;
    }
    
    .nav-links a {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      color: #4a5568;
      text-decoration: none;
      border-radius: 12px;
      transition: all 0.3s ease;
      font-size: 0.95rem;
      font-weight: 500;
    }
    
    .nav-links a:hover {
      background: rgba(244, 247, 254, 0.8);
      color: #4F46E5;
      transform: translateX(5px);
    }
    
    .nav-links a.active {
      background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.1) 100%);
      color: #4F46E5;
      border-left: 3px solid #4F46E5;
      font-weight: 600;
    }
    
    .nav-links a .icon {
      font-size: 1.1rem;
      width: 24px;
      text-align: center;
    }
    
    .logout-btn {
      width: 100%;
      padding: 14px 20px;
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
      color: #dc2626;
      border: none;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      transition: all 0.3s ease;
      margin-top: auto;
    }
    
    .logout-btn:hover {
      background: rgba(220, 38, 38, 0.15);
      transform: translateY(-2px);
    }
    
    /* Main Content */
    .main-content {
      flex: 1;
      margin-left: 260px;
      margin-top: 70px;
      padding: 30px;
      min-height: calc(100vh - 70px);
      transition: margin-left 0.3s ease;
    }
    
    .main-content-expanded {
      margin-left: 0;
    }
    
    .welcome-section {
      margin-bottom: 40px;
    }
    
    .welcome-section h1 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 8px;
    }
    
    .welcome-section p {
      font-size: 1.1rem;
      color: #718096;
    }
    
    /* Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }
    
    .stat-card {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 25px;
      border: 1px solid rgba(229, 231, 235, 0.8);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: all 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    
    .card-icon {
      width: 60px;
      height: 60px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }
    
    .card-value {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 8px;
    }
    
    .card-title {
      font-size: 0.95rem;
      color: #718096;
      font-weight: 500;
    }
    
    /* Table */
    .table-container {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      margin-top: 30px;
    }
    
    .table-header {
      padding: 25px;
      border-bottom: 1px solid rgba(229, 231, 235, 0.8);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .table-header h3 {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .search-box {
      position: relative;
      width: 300px;
    }
    
    .search-input {
      width: 100%;
      padding: 12px 20px 12px 45px;
      border: 1px solid rgba(229, 231, 235, 0.8);
      border-radius: 12px;
      font-size: 0.95rem;
      background: rgba(249, 250, 251, 0.8);
      transition: all 0.3s ease;
    }
    
    .search-input:focus {
      outline: none;
      border-color: #4F46E5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      background: white;
    }
    
    .search-icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .data-table thead {
      background: linear-gradient(135deg, rgba(244, 247, 254, 0.8) 0%, rgba(237, 242, 252, 0.8) 100%);
    }
    
    .data-table th {
      padding: 18px 20px;
      text-align: left;
      font-weight: 600;
      color: #4a5568;
      font-size: 0.9rem;
      border-bottom: 1px solid rgba(229, 231, 235, 0.8);
    }
    
    .data-table td {
      padding: 18px 20px;
      border-bottom: 1px solid rgba(229, 231, 235, 0.8);
      color: #4a5568;
      font-size: 0.9rem;
    }
    
    .data-table tr:last-child td {
      border-bottom: none;
    }
    
    .data-table tr:hover td {
      background: rgba(249, 250, 251, 0.5);
    }
    
    .employee-image {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(229, 231, 235, 0.8);
    }
    
    /* Buttons */
    .btn-group {
      display: flex;
      gap: 10px;
    }
    
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    
    .btn-primary {
      background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
      color: white;
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
    }
    
    .btn-success {
      background: linear-gradient(135deg, #10B981 0%, #34D399 100%);
      color: white;
    }
    
    .btn-danger {
      background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
      color: white;
    }
    
    .btn-warning {
      background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
      color: white;
    }
    
    .btn-secondary {
      background: linear-gradient(135deg, #6B7280 0%, #4B5563 100%);
      color: white;
    }
    
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .btn:active {
      transform: translateY(0);
    }
    
    /* Status Badge */
    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      display: inline-block;
    }
    
    /* Edit Form */
    .edit-form-container {
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      margin-top: 30px;
    }
    
    .form-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 30px;
    }
    
    .form-header h3 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .back-btn {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      font-size: 1.2rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #4a5568;
      font-size: 0.9rem;
    }
    
    .form-input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid rgba(229, 231, 235, 0.8);
      border-radius: 12px;
      font-size: 0.95rem;
      background: rgba(249, 250, 251, 0.8);
      transition: all 0.3s ease;
    }
    
    .form-input:focus {
      outline: none;
      border-color: #4F46E5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
      background: white;
    }
    
    .form-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-end;
      padding-top: 20px;
      border-top: 1px solid rgba(229, 231, 235, 0.8);
    }
    
    /* Loading */
    .loading {
      text-align: center;
      padding: 60px;
      color: #718096;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 3px solid rgba(229, 231, 235, 0.8);
      border-top-color: #4F46E5;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    /* Empty State */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #9ca3af;
    }
    
    .empty-state-icon {
      font-size: 3rem;
      margin-bottom: 20px;
      opacity: 0.5;
    }
    
    /* Responsive */
    @media (max-width: 1024px) {
      .sidebar {
        transform: translateX(-100%);
      }
      
      .sidebar-open {
        transform: translateX(0);
      }
      
      .main-content {
        margin-left: 0;
      }
      
      .menu-toggle {
        display: block;
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 768px) {
      .top-navbar {
        padding: 0 20px;
      }
      
      .main-content {
        padding: 20px;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .search-box {
        width: 100%;
      }
      
      .table-header {
        flex-direction: column;
        gap: 15px;
        align-items: stretch;
      }
      
      .data-table {
        display: block;
        overflow-x: auto;
      }
      
      .btn-group {
        flex-direction: column;
        gap: 8px;
      }
    }
    
    @media (max-width: 480px) {
      .welcome-section h1 {
        font-size: 1.8rem;
      }
      
      .nav-right {
        gap: 15px;
      }
      
      .profile-info {
        display: none;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      
      <div className="dashboard-wrapper">
        {/* Top Navbar */}
        <nav className="top-navbar">
          <div className="nav-left">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div className="dashboard-title">Admin Panel</div>
          </div>
          
          <div className="nav-right">
            <button
              className="logout-btn"
              onClick={handleLogout}
              style={{
                padding: '10px 16px',
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)',
                color: '#dc2626',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.15)'}
              onMouseLeave={(e) => e.target.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%)'}
            >
              <FaSignOutAlt /> Logout
            </button>
            <div className="admin-profile">
              <div className="profile-avatar">
                {profile?.username?.charAt(0) || 'A'}
              </div>
              <div className="profile-info">
                <h5>{profile?.username || 'Admin'}</h5>
                <p>{profile?.company || 'Admin'}</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-title">Admin Panel</div>
            <div className="sidebar-company">{profile?.company || 'No Company'}</div>
          </div>
          
          <ul className="nav-links">
            <li>
              <a 
                href="#dashboard" 
                className={activeTab === "attendanceGif" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("attendanceGif");
                  setSidebarOpen(false);
                }}
              >
                <FaTachometerAlt className="icon" /> Dashboard
              </a>
            </li>
            <li>
              <a 
                href="#employees" 
                className={activeTab === "employees" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("employees");
                  setEditEmployee(null);
                  setSidebarOpen(false);
                }}
              >
                <FaUsers className="icon" /> Employees
              </a>
            </li>
            <li>
              <a 
                href="#create-employee" 
                className={activeTab === "create-employee" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("create-employee");
                  setSidebarOpen(false);
                }}
              >
                <FaUserPlus className="icon" /> Add Employee
              </a>
            </li>
            <li>
              <a 
                href="#attendance" 
                className={activeTab === "attendance" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("attendance");
                  setSidebarOpen(false);
                }}
              >
                <FaCalendarCheck className="icon" /> Attendance
              </a>
            </li>
            <li>
              <a 
                href="#leaves" 
                className={activeTab === "leaves" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("leaves");
                  setSidebarOpen(false);
                }}
              >
                <FaClipboardList className="icon" /> Leave Approvals
              </a>
            </li>
            <li>
              <a 
                href="#salary-slip" 
                className={activeTab === "salary-slip" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("salary-slip");
                  setSidebarOpen(false);
                }}
              >
                <FaFileInvoiceDollar className="icon" /> Salary Slip
              </a>
            </li>
            <li>
              <a 
                href="#tasks" 
                className={activeTab === "tasks" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("tasks");
                  setSidebarOpen(false);
                }}
              >
                <FaTasks className="icon" /> Manage Tasks
              </a>
            </li>
            <li>
              <a 
                href="#messages" 
                className={activeTab === "messages" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("messages");
                  setSidebarOpen(false);
                }}
              >
                <FaEnvelope className="icon" /> Emp Messages
              </a>
            </li>
          </ul>
          
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className={`main-content ${sidebarOpen ? 'main-content-expanded' : ''}`}>
          <div className="welcome-section">
            <h1>Welcome, {profile?.username || 'Admin'}</h1>
            <p>{profile?.company || 'Admin Panel'}</p>
          </div>

          {activeTab === "employees" && !editEmployee && (
            <>
              <div className="table-container">
                <div className="table-header">
                  <h3>Employees</h3>
                  <div className="search-box">
                    <FaSearch className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search employees by name or email..."
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                
                {loading ? (
                  <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading employees...</p>
                  </div>
                ) : (
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Salary</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredEmployees.map((emp) => (
                        <tr key={emp._id}>
                          <td>
                            {emp.image ? (
                              <img
                                src={
                                  emp.image.startsWith("http")
                                    ? emp.image
                                    : `https://steelblue-sheep-699352.hostingersite.com${emp.image.replace(/^\//, "")}`
                                }
                                alt={emp.name}
                                className="employee-image"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='45' height='45' viewBox='0 0 45 45'%3E%3Crect width='45' height='45' fill='%23f0f4f8' rx='22.5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='16' fill='%234a5568'%3E${emp?.name?.charAt(0) || 'E'}%3C/text%3E%3C/svg%3E";
                                }}
                              />
                            ) : (
                              <div className="employee-image" style={{
                                background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '600'
                              }}>
                                {emp?.name?.charAt(0) || 'E'}
                              </div>
                            )}
                          </td>
                          <td>{emp.employeeId}</td>
                          <td>{emp.name}</td>
                          <td>{emp.email}</td>
                          <td>{emp.position}</td>
                          <td>${emp.salary}</td>
                          <td>
                            <div className="btn-group">
                              <button 
                                className="btn btn-warning"
                                onClick={() => setEditEmployee(emp)}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button 
                                className="btn btn-danger"
                                onClick={() => handleDelete(emp._id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredEmployees.length === 0 && (
                        <tr>
                          <td colSpan="7" className="empty-state">
                            <div className="empty-state-icon">
                              <FaUsers />
                            </div>
                            <p>No employees found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {activeTab === "employees" && editEmployee && (
            <div className="edit-form-container">
              <div className="form-header">
                <button 
                  className="back-btn"
                  onClick={() => setEditEmployee(null)}
                >
                  <FaArrowLeft /> Back
                </button>
                <h3>Edit Employee</h3>
              </div>
              
              <form onSubmit={handleEditSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editEmployee.name || ""}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={editEmployee.email || ""}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Position</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editEmployee.position || ""}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          position: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Salary</label>
                    <input
                      type="number"
                      className="form-input"
                      value={editEmployee.salary || ""}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          salary: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editEmployee.department || ""}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          department: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Join Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={
                        editEmployee.joinDate
                          ? new Date(editEmployee.joinDate).toISOString().split("T")[0]
                          : ""
                      }
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          joinDate: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Employee ID</label>
                    <input
                      type="text"
                      className="form-input"
                      value={editEmployee.employeeId || ""}
                      onChange={(e) =>
                        setEditEmployee({
                          ...editEmployee,
                          employeeId: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    <FaCheck /> Update Employee
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditEmployee(null)}
                  >
                    <FaTimesCircle /> Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "create-employee" && <CreateEmployee />}
          {activeTab === "attendance" && <EmployeeAttendance />}
          {activeTab === "salary-slip" && <SalarySlipPage />}
          {activeTab === "tasks" && <AdminTaskPage />}
          {activeTab === "messages" && <AdminMessages />}
          
          {activeTab === "leaves" && (
            <div className="table-container">
              <div className="table-header">
                <h3>Leave Requests</h3>
              </div>
              
              {loadingLeaves ? (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>Loading leave requests...</p>
                </div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Reason</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map((leave) => (
                      <tr key={leave._id}>
                        <td>{leave.userId?.name || "Unknown"}</td>
                        <td>{new Date(leave.startDate).toLocaleDateString()}</td>
                        <td>{new Date(leave.endDate).toLocaleDateString()}</td>
                        <td>{leave.reason}</td>
                        <td>
                          <span className="status-badge" style={{
                            backgroundColor: getStatusColor(leave.status) + '20',
                            color: getStatusColor(leave.status)
                          }}>
                            {leave.status}
                          </span>
                        </td>
                        <td>
                          {leave.status === "pending" && (
                            <div className="btn-group">
                              <button
                                className="btn btn-success"
                                onClick={() => handleLeaveAction(leave._id, "approved")}
                              >
                                <FaCheck /> Approve
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleLeaveAction(leave._id, "rejected")}
                              >
                                <FaTimes /> Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {leaves.length === 0 && (
                      <tr>
                        <td colSpan="6" className="empty-state">
                          <div className="empty-state-icon">
                            <FaClipboardList />
                          </div>
                          <p>No leave requests found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          )}
          
          {activeTab === "attendanceGif" && <AttendanceLeaveDashboard />}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;