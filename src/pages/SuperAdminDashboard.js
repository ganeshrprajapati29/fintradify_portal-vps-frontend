import React, { useEffect, useState, useCallback, memo, useRef, useMemo, useDeferredValue } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUserShield, FaUsers, FaCog, FaSignOutAlt,FaSearch, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus ,FaUserFriends,FaTasks,FaCalendarAlt,FaEnvelope,FaChartBar} from "react-icons/fa";
import { Offcanvas, Button } from "react-bootstrap";
import SuperAdminSettings from "./SuperAdminSettings";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const SuperAdminDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("username");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState({
    company: "",
    createdAfter: "",
    createdBefore: "",
    lastLogin: ""
  });

  // Use deferred value for search to prevent excessive re-renders
  const deferredSearch = useDeferredValue(search);
  const safeSearch = deferredSearch.toLowerCase();
  const [activePage, setActivePage] = useState("dashboard");
  const [tasks, setTasks] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reports, setReports] = useState({});
  const hasFetchedRef = useRef(false);
  const loggedInUser = localStorage.getItem("username");
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`${API_URL}/api/superadmin/admins`);
      setAdmins(res.data.admins || []);
    } catch (err) {
      console.error("❌ Fetch Admins Error:", err);
      alert("Failed to load admins");
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  const fetchEmployees = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/superadmin/employees`);
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.error("❌ Fetch Employees Error:", err);
    }
  }, [API_URL]);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/superadmin/tasks`);
      setTasks(res.data.tasks || []);
    } catch (err) {
      console.error("❌ Fetch Tasks Error:", err);
    }
  }, [API_URL]);

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/superadmin/leaves`);
      setLeaves(res.data.leaves || []);
    } catch (err) {
      console.error("❌ Fetch Leaves Error:", err);
    }
  }, [API_URL]);

  const fetchMessages = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/superadmin/messages`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("❌ Fetch Messages Error:", err);
    }
  }, [API_URL]);

  const fetchReports = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`${API_URL}/api/superadmin/reports`);
      setReports(res.data.reports || {});
    } catch (err) {
      console.error("❌ Fetch Reports Error:", err);
    }
  }, [API_URL]);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchAdmins();
      fetchEmployees();
      fetchTasks();
      fetchLeaves();
      fetchMessages();
      fetchReports();
    }
  }, []);

  const handleSubmitAdmin = async (e) => {
    e.preventDefault();
    try {
      const payload = { username, company, email, password };
      let res;

      if (editId) {
        res = await axiosInstance.put(`${API_URL}/api/superadmin/admins/${editId}`, payload);
        const updatedAdmin = res.data.admin;
        setAdmins(admins.map((a) => (a._id === editId ? updatedAdmin : a)));
        setEditId(null);
      } else {
        res = await axiosInstance.post(`${API_URL}/api/superadmin/admins`, payload);
        const newAdmin = res.data.admin;
        setAdmins([...admins, newAdmin]);
      }

      setUsername("");
      setCompany("");
      setEmail("");
      setPassword("");
      alert(res.data.msg || "Success");
    } catch (err) {
      console.error("❌ Save Admin Error:", err);
      alert(err.response?.data?.msg || "Failed to save admin");
    }
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const res = await axiosInstance.delete(`${API_URL}/api/superadmin/admins/${id}`);
      alert(res.data.msg || "Deleted successfully");
      setAdmins(admins.filter((a) => a._id !== id));
    } catch (err) {
      console.error("❌ Delete Admin Error:", err);
      alert(err.response?.data?.msg || "Failed to delete admin");
    }
  };

  const handleEditAdmin = (admin) => {
    setEditId(admin._id);
    setUsername(admin.username || "");
    setCompany(admin.company || "");
    setEmail(admin.email || "");
    setPassword("");
    setActivePage("admins");
    navigate("/superadmin/admins");
  };

  const handleToggleAdminStatus = async (admin) => {
    try {
      const newStatus = !admin.isActive;
      const res = await axiosInstance.patch(
        `${API_URL}/api/superadmin/admins/${admin._id}/status`,
        { isActive: newStatus }
      );
      const updatedAdmin = res.data.admin;
      setAdmins(admins.map((a) => (a._id === admin._id ? updatedAdmin : a)));
      alert(res.data.msg || "Status updated");
    } catch (err) {
      console.error("❌ Toggle Admin Status Error:", err);
      alert(err.response?.data?.msg || "Failed to update admin status");
    }
  };

  const handleToggleEmployeeStatus = async (employee) => {
    try {
      const newStatus = !employee.isActive;
      const res = await axiosInstance.patch(
        `${API_URL}/api/superadmin/employees/${employee._id}/status`,
        { isActive: newStatus }
      );
      const updatedEmployee = res.data.employee;
      setEmployees(employees.map((e) => (e._id === employee._id ? updatedEmployee : e)));
      alert(res.data.msg || "Employee status updated");
    } catch (err) {
      console.error("❌ Toggle Employee Status Error:", err);
      alert(err.response?.data?.msg || "Failed to update employee status");
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to terminate this employee?")) return;
    try {
      const res = await axiosInstance.delete(`${API_URL}/api/superadmin/employees/${id}`);
      alert(res.data.msg || "Employee terminated successfully");
      setEmployees(employees.filter((e) => e._id !== id));
    } catch (err) {
      console.error("❌ Delete Employee Error:", err);
      alert(err.response?.data?.msg || "Failed to terminate employee");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await axiosInstance.delete(`${API_URL}/api/superadmin/tasks/${id}`);
      alert(res.data.msg || "Task deleted successfully");
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("❌ Delete Task Error:", err);
      alert(err.response?.data?.msg || "Failed to delete task");
    }
  };

  const handleApproveLeave = async (id) => {
    if (!window.confirm("Are you sure you want to approve this leave request?")) return;
    try {
      const res = await axiosInstance.patch(`${API_URL}/api/superadmin/leaves/${id}/approve`);
      alert(res.data.msg || "Leave approved successfully");
      setLeaves(leaves.map((l) => l._id === id ? { ...l, status: 'approved' } : l));
    } catch (err) {
      console.error("❌ Approve Leave Error:", err);
      alert(err.response?.data?.msg || "Failed to approve leave");
    }
  };

  const handleRejectLeave = async (id) => {
    if (!window.confirm("Are you sure you want to reject this leave request?")) return;
    try {
      const res = await axiosInstance.patch(`${API_URL}/api/superadmin/leaves/${id}/reject`);
      alert(res.data.msg || "Leave rejected successfully");
      setLeaves(leaves.map((l) => l._id === id ? { ...l, status: 'rejected' } : l));
    } catch (err) {
      console.error("❌ Reject Leave Error:", err);
      alert(err.response?.data?.msg || "Failed to reject leave");
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await axiosInstance.delete(`${API_URL}/api/superadmin/messages/${id}`);
      alert(res.data.msg || "Message deleted successfully");
      setMessages(messages.filter((m) => m._id !== id));
    } catch (err) {
      console.error("❌ Delete Message Error:", err);
      alert(err.response?.data?.msg || "Failed to delete message");
    }
  };

  const handleBulkActivate = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to activate ${selectedAdmins.length} admin(s)?`)) return;
    try {
      await Promise.all(selectedAdmins.map(id =>
        axiosInstance.patch(`${API_URL}/api/superadmin/admins/${id}/status`, { isActive: true })
      ));
      alert(`${selectedAdmins.length} admin(s) activated successfully`);
      setAdmins(prevAdmins => prevAdmins.map(a => selectedAdmins.includes(a._id) ? {...a, isActive: true} : a));
      setSelectedAdmins([]);
    } catch (err) {
      console.error("❌ Bulk Activate Error:", err);
      alert("Failed to activate selected admins");
    }
  }, [selectedAdmins, API_URL]);

  const handleBulkDeactivate = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to deactivate ${selectedAdmins.length} admin(s)?`)) return;
    try {
      await Promise.all(selectedAdmins.map(id =>
        axiosInstance.patch(`${API_URL}/api/superadmin/admins/${id}/status`, { isActive: false })
      ));
      alert(`${selectedAdmins.length} admin(s) deactivated successfully`);
      setAdmins(prevAdmins => prevAdmins.map(a => selectedAdmins.includes(a._id) ? {...a, isActive: false} : a));
      setSelectedAdmins([]);
    } catch (err) {
      console.error("❌ Bulk Deactivate Error:", err);
      alert("Failed to deactivate selected admins");
    }
  }, [selectedAdmins, API_URL]);

  const handleBulkDelete = useCallback(async () => {
    if (!window.confirm(`Are you sure you want to permanently delete ${selectedAdmins.length} admin(s)? This action cannot be undone.`)) return;
    try {
      await Promise.all(selectedAdmins.map(id =>
        axiosInstance.delete(`${API_URL}/api/superadmin/admins/${id}`)
      ));
      alert(`${selectedAdmins.length} admin(s) deleted successfully`);
      setAdmins(prevAdmins => prevAdmins.filter(a => !selectedAdmins.includes(a._id)));
      setSelectedAdmins([]);
    } catch (err) {
      console.error("❌ Bulk Delete Error:", err);
      alert("Failed to delete selected admins");
    }
  }, [selectedAdmins, API_URL]);

  const handleViewEmployeeProfile = (employee) => {
    // For now, just show an alert with employee details
    // In a real app, this would navigate to a detailed profile page
    alert(`Employee Profile:\n\nName: ${employee.name}\nEmail: ${employee.email}\nPosition: ${employee.position}\nDepartment: ${employee.department}\nPhone: ${employee.phone || 'N/A'}\nLocation: ${employee.address || 'N/A'}\nSalary: ₹${employee.salary || 'N/A'}\nJoin Date: ${employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}\nStatus: ${employee.isActive ? 'Active' : 'Inactive'}`);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("savedPath");
      navigate("/");
    }
  };

  const handleMenuClick = (page) => {
    setActivePage(page);
  };

  // Memoized filtered admins to prevent unnecessary re-renders
  const filteredAdmins = useMemo(() => {
    return admins.filter((a) =>
      [a.username, a.email, a.company]
        .map((x) => x?.toLowerCase() || "")
        .some((v) => v.includes(safeSearch))
    );
  }, [admins, safeSearch]);

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: FaUserShield },
    { key: "admins", label: "Manage Admins", icon: FaUsers },
    { key: "employees", label: "Manage Employees", icon: FaUserFriends },
    { key: "tasks", label: "Tasks", icon: FaTasks },
    { key: "leaves", label: "Leave Requests", icon: FaCalendarAlt },
    { key: "messages", label: "Messages", icon: FaEnvelope },
    { key: "reports", label: "Reports", icon: FaChartBar },
    { key: "settings", label: "Settings", icon: FaCog },
  ];

  const chartsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  };

  const chartContainerStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(2, 132, 199, 0.1)',
    border: '2px solid rgba(2, 132, 199, 0.1)',
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #e0f7ff 100%);
          min-height: 100vh;
        }

        .superadmin-dashboard {
          min-height: 100vh;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 50%, #e0f7ff 100%);
          display: flex;
        }

        .superadmin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 2px solid rgba(2, 132, 199, 0.1);
          box-shadow: 4px 0 20px rgba(2, 132, 199, 0.1);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: 20px 15px;
          border-bottom: 2px solid rgba(2, 132, 199, 0.15);
          text-align: center;
        }

        .sidebar-header h3 {
          color: #0284c7;
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0;
        }



        .sidebar-menu {
          flex-grow: 1;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
        }

        .menu-item {
          list-style: none;
        }

        .menu-btn {
          width: 100%;
          background: transparent;
          border: none;
          color: #475569;
          padding: 16px 18px;
          border-radius: 12px;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
        }

        .menu-btn:hover {
          background: rgba(2, 132, 199, 0.08);
          color: #0284c7;
          transform: translateX(8px);
        }

        .menu-btn.active {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(3, 105, 161, 0.15) 100%);
          color: #0284c7;
          border-left: 4px solid #0284c7;
          padding-left: 14px;
          box-shadow: 0 4px 15px rgba(2, 132, 199, 0.1);
        }

        .menu-btn svg {
          font-size: 1.3rem;
        }

        .sidebar-footer {
          padding: 20px 15px;
          border-top: 2px solid rgba(2, 132, 199, 0.15);
          margin-top: auto;
        }

        .user-info {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(3, 105, 161, 0.08) 100%);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 15px;
          border: 2px solid rgba(2, 132, 199, 0.15);
          backdrop-filter: blur(10px);
        }

        .user-info p {
          margin: 0;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .user-info strong {
          color: #0284c7;
          display: block;
          font-size: 0.98rem;
          word-break: break-all;
        }

        .logout-btn {
          width: 100%;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border: none;
          color: #fff;
          padding: 12px 15px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .logout-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(2, 132, 199, 0.4);
        }

        .sidebar-menu {
          flex-grow: 1;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          list-style: none;
        }

        .menu-item {
          list-style: none;
        }

        .menu-btn {
          width: 100%;
          background: transparent;
          border: none;
          color: #475569;
          padding: 16px 18px;
          border-radius: 12px;
          font-size: 0.98rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
        }

        .menu-btn:hover {
          background: rgba(2, 132, 199, 0.08);
          color: #0284c7;
          transform: translateX(8px);
        }

        .menu-btn.active {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.15) 0%, rgba(3, 105, 161, 0.15) 100%);
          color: #0284c7;
          border-left: 4px solid #0284c7;
          padding-left: 14px;
          box-shadow: 0 4px 15px rgba(2, 132, 199, 0.1);
        }

        .menu-btn svg {
          font-size: 1.3rem;
        }

        .sidebar-footer {
          padding: 20px 15px;
          border-top: 2px solid rgba(2, 132, 199, 0.15);
          margin-top: auto;
        }

        .user-info {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(3, 105, 161, 0.08) 100%);
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 15px;
          border: 2px solid rgba(2, 132, 199, 0.15);
          backdrop-filter: blur(10px);
        }

        .user-info p {
          margin: 0;
          font-size: 0.75rem;
          color: #64748b;
          margin-bottom: 6px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .user-info strong {
          color: #0284c7;
          display: block;
          font-size: 0.98rem;
          word-break: break-all;
        }

        .logout-btn {
          width: 100%;
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border: none;
          color: #fff;
          padding: 12px 15px;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.9rem;
        }

        .logout-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(2, 132, 199, 0.4);
        }

        .superadmin-content {
          flex-grow: 1;
          margin-left: 300px;
          padding: 40px;
          transition: margin-left 0.3s ease;
          overflow-y: auto;
        }

        .superadmin-content::-webkit-scrollbar {
          width: 8px;
        }

        .superadmin-content::-webkit-scrollbar-track {
          background: transparent;
        }

        .superadmin-content::-webkit-scrollbar-thumb {
          background: rgba(2, 132, 199, 0.3);
          border-radius: 4px;
        }

        .superadmin-content::-webkit-scrollbar-thumb:hover {
          background: rgba(2, 132, 199, 0.5);
        }

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
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 28px;
          margin-top: 25px;
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

        .admin-info strong {
          color: #333;
          font-size: 1.08rem;
          display: block;
          margin-bottom: 8px;
        }

        .admin-info small {
          color: #94a3b8;
          display: block;
          margin-top: 6px;
          font-size: 0.86rem;
        }

        .admin-info em {
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

        .btn-outline-warning {
          background: transparent;
          color: #f59e0b;
          border: 2px solid #f59e0b;
        }

        .btn-outline-warning:hover {
          background: rgba(245, 158, 11, 0.1);
          transform: translateY(-2px);
        }

        .btn-outline-success {
          background: transparent;
          color: #10b981;
          border: 2px solid #10b981;
        }

        .btn-outline-success:hover {
          background: rgba(16, 185, 129, 0.1);
          transform: translateY(-2px);
        }

        .btn-warning {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #fff;
          border: none;
        }

        .btn-warning:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.3);
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

        .btn-primary {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #fff;
          border: none;
          padding: 12px 24px;
          font-size: 0.9rem;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(2, 132, 199, 0.4);
        }

        .form-section {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          padding: 32px;
          border-radius: 18px;
          box-shadow: 0 8px 40px rgba(2, 132, 199, 0.12);
          margin-top: 35px;
          border: 2px solid rgba(2, 132, 199, 0.1);
        }

        .form-section h4 {
          font-weight: 800;
          margin-bottom: 28px;
          color: #333;
          font-size: 1.35rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .form-section h4 svg {
          color: #0284c7;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-control {
          width: 100%;
          padding: 13px 16px;
          border: 2px solid rgba(2, 132, 199, 0.2);
          border-radius: 10px;
          font-size: 0.96rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.98);
        }

        .form-control:focus {
          outline: none;
          border-color: #0284c7;
          box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.15);
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

        @media (max-width: 768px) {
          .superadmin-sidebar {
            width: 250px;
          }

          .superadmin-content {
            margin-left: 250px;
            padding: 20px 15px;
          }

          .content-header h2 {
            font-size: 1.8rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .charts-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .list-group-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .btn-group {
            width: 100%;
            flex-wrap: wrap;
          }

          .btn {
            flex: 1;
            min-width: 100px;
          }

          .form-section {
            padding: 24px;
          }

          .content-card {
            padding: 24px;
          }
        }

        @media (max-width: 576px) {
          .superadmin-sidebar {
            width: 200px;
          }

          .superadmin-content {
            margin-left: 200px;
            padding: 15px 10px;
          }

          .content-card,
          .form-section {
            padding: 18px;
          }

          .stat-card {
            padding: 20px;
          }

          .stat-card h3 {
            font-size: 2.2rem;
          }

          .content-header h2 {
            font-size: 1.5rem;
          }

          .sidebar-header h3 {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="superadmin-dashboard">
        <aside className="superadmin-sidebar">
          <div className="sidebar-header">
            <h3>Super Admin Panel</h3>
          </div>

          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.key} className="menu-item">
                  <button
                    className={`menu-btn ${activePage === item.key ? "active" : ""}`}
                    onClick={() => handleMenuClick(item.key)}
                  >
                    <IconComponent /> {item.label}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="sidebar-footer">
            {loggedInUser && (
              <div className="user-info">
                <p>👤 Logged in</p>
                <strong>{loggedInUser}</strong>
              </div>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </aside>

        <main className="superadmin-content">
          {activePage === "dashboard" && (
            <>
              <div className="content-header">
                <h2>Dashboard</h2>
                <p>Welcome back, {loggedInUser}! Here's your system overview.</p>
              </div>
              <div className="content-card">
                <div className="stats-grid">
                  <div className="stat-card">
                    <h5>Total Admins</h5>
                    <h3>{admins.length}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Employees</h5>
                    <h3>{employees.length}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Tasks</h5>
                    <h3>{tasks.length}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Leave Requests</h5>
                    <h3>{leaves.length}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Messages</h5>
                    <h3>{messages.length}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Active Admins</h5>
                    <h3>{admins.filter(a => a.isActive).length}</h3>
                  </div>
                </div>
              </div>

              <div className="content-card">
                <h4 style={{ marginBottom: '20px', color: '#0284c7', fontWeight: '800' }}>System Overview</h4>
                <div className="charts-grid">
                  <div className="chart-container">
                    <h5>Admin Status Distribution</h5>
                    <Pie
                      data={{
                        labels: ['Active Admins', 'Inactive Admins'],
                        datasets: [{
                          data: [admins.filter(a => a.isActive).length, admins.filter(a => !a.isActive).length],
                          backgroundColor: ['#10b981', '#ef4444'],
                          borderColor: ['#059669', '#dc2626'],
                          borderWidth: 2,
                        }],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'bottom',
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="chart-container">
                    <h5>System Metrics</h5>
                    <Bar
                      data={{
                        labels: ['Admins', 'Employees', 'Tasks', 'Leaves', 'Messages'],
                        datasets: [{
                          label: 'Count',
                          data: [admins.length, employees.length, tasks.length, leaves.length, messages.length],
                          backgroundColor: 'rgba(2, 132, 199, 0.6)',
                          borderColor: '#0284c7',
                          borderWidth: 2,
                        }],
                      }}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === "admins" && (
            <>
              <div className="content-header">
                <h2>Manage Admins</h2>
                <p>Create, update, and manage system administrators.</p>
              </div>

              <div className="content-card">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by username, email, or company..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className="result-count">Found {filteredAdmins.length} admin(s)</p>

                {loading ? (
                  <div className="loading">Loading admins...</div>
                ) : filteredAdmins.length > 0 ? (
                  <div className="table-responsive">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>
                            <input
                              type="checkbox"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedAdmins(filteredAdmins.map(a => a._id));
                                } else {
                                  setSelectedAdmins([]);
                                }
                              }}
                              checked={selectedAdmins.length === filteredAdmins.length && filteredAdmins.length > 0}
                            />
                          </th>
                          <th>Admin</th>
                          <th>Company</th>
                          <th>Status</th>
                          <th>Created</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAdmins.map((admin) => (
                          <tr key={admin._id}>
                            <td>
                              <input
                                type="checkbox"
                                className="admin-checkbox"
                                checked={selectedAdmins.includes(admin._id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAdmins([...selectedAdmins, admin._id]);
                                  } else {
                                    setSelectedAdmins(selectedAdmins.filter(id => id !== admin._id));
                                  }
                                }}
                              />
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div className="admin-avatar">
                                  {admin.username.charAt(0).toUpperCase()}
                                </div>
                                <div className="admin-details">
                                  <h6>{admin.username}</h6>
                                  <small>{admin.email}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <em>{admin.company || 'N/A'}</em>
                            </td>
                            <td>
                              {admin.isActive ? (
                                <span className="badge bg-success">● Active</span>
                              ) : (
                                <span className="badge bg-secondary">● Inactive</span>
                              )}
                            </td>
                            <td>
                              <small>
                                {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                              </small>
                            </td>
                            <td>
                              <div className="btn-group">
                                <button
                                  className={`btn ${
                                    admin.isActive ? "btn-outline-warning" : "btn-outline-success"
                                  }`}
                                  onClick={() => handleToggleAdminStatus(admin)}
                                  title={admin.isActive ? "Disable Admin" : "Enable Admin"}
                                >
                                  {admin.isActive ? <FaToggleOn /> : <FaToggleOff />}
                                </button>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => handleEditAdmin(admin)}
                                  title="Edit Admin"
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => handleDeleteAdmin(admin._id)}
                                  title="Delete Admin"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state">
                    <p>No admins found. Create your first admin below.</p>
                  </div>
                )}
              </div>

              <div className="form-section">
                <h4>
                  <FaPlus /> {editId ? "Update Admin" : "Create New Admin"}
                </h4>
                <form onSubmit={handleSubmitAdmin}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                    <div className="form-group">
                      <label style={{ fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                        Username *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter admin username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter company name"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter admin email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontWeight: '600', color: '#475569', display: 'block', marginBottom: '8px' }}>
                        Password {editId ? "(leave blank to keep current)" : "*"}
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder={editId ? "Enter new password (optional)" : "Enter admin password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!editId}
                      />
                    </div>
                  </div>

                  <div style={{ marginTop: '25px', display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <button type="submit" className="btn btn-primary">
                      <FaPlus /> {editId ? "Update Admin" : "Create Admin"}
                    </button>
                    {editId && (
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                          setEditId(null);
                          setUsername("");
                          setCompany("");
                          setEmail("");
                          setPassword("");
                        }}
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                </form>

                {/* Admin Statistics */}
                <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(2, 132, 199, 0.05)', borderRadius: '12px' }}>
                  <h5 style={{ color: '#0284c7', marginBottom: '15px' }}>Admin Statistics</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#0284c7' }}>{admins.length}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Total Admins</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>{admins.filter(a => a.isActive).length}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Active Admins</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ef4444' }}>{admins.filter(a => !a.isActive).length}</div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Inactive Admins</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '800', color: '#f59e0b' }}>
                        {admins.length > 0 ? Math.round((admins.filter(a => a.isActive).length / admins.length) * 100) : 0}%
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#64748b' }}>Active Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === "employees" && (
            <>
              <div className="content-header">
                <h2>Manage Employees</h2>
                <p>View and manage all employees in the system.</p>
              </div>

              <div className="content-card">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className="result-count">Found {employees.filter((emp) =>
                  [emp.name, emp.email, emp.department, emp.position]
                    .map((x) => x?.toLowerCase() || "")
                    .some((v) => v.includes(search.toLowerCase()))
                ).length} employee(s)</p>

                {employees.length > 0 ? (
                  <ul className="list-group">
                    {employees.filter((emp) =>
                      [emp.name, emp.email, emp.department, emp.position]
                        .map((x) => x?.toLowerCase() || "")
                        .some((v) => v.includes(search.toLowerCase()))
                    ).map((employee) => (
                      <li key={employee._id} className="list-group-item">
                        <div className="admin-info">
                          <strong>{employee.name}</strong>
                          <small>{employee.email}</small>
                          <em>{employee.position} - {employee.department}</em>
                          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                            <span>📞 {employee.phone || 'N/A'}</span>
                            <span style={{ marginLeft: '15px' }}>📍 {employee.address || 'N/A'}</span>
                            <span style={{ marginLeft: '15px' }}>💰 ₹{employee.salary || 'N/A'}</span>
                            <span style={{ marginLeft: '15px' }}>📅 {employee.joinDate ? new Date(employee.joinDate).toLocaleDateString() : 'N/A'}</span>
                          </div>
                          {employee.isActive ? (
                            <span className="badge bg-success">● Active</span>
                          ) : (
                            <span className="badge bg-secondary">● Disabled</span>
                          )}
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => handleViewEmployeeProfile(employee)}
                          >
                            <FaUserFriends /> View Profile
                          </button>
                          <button
                            className={`btn ${
                              employee.isActive ? "btn-outline-warning" : "btn-outline-success"
                            }`}
                            onClick={() => handleToggleEmployeeStatus(employee)}
                          >
                            {employee.isActive ? (
                              <>
                                <FaToggleOn /> Disable
                              </>
                            ) : (
                              <>
                                <FaToggleOff /> Enable
                              </>
                            )}
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteEmployee(employee._id)}
                          >
                            <FaTrash /> Terminate
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <p>No employees found.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activePage === "tasks" && (
            <>
              <div className="content-header">
                <h2>Tasks</h2>
                <p>View and manage all tasks in the system.</p>
              </div>

              <div className="content-card">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by title, assigned to, or status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className="result-count">Found {tasks.filter((task) =>
                  [task.title, task.description, task.assignedTo?.username, task.assignedBy?.username, task.status]
                    .map((x) => x?.toLowerCase() || "")
                    .some((v) => v.includes(search.toLowerCase()))
                ).length} task(s)</p>

                {tasks.length > 0 ? (
                  <ul className="list-group">
                    {tasks.filter((task) =>
                      [task.title, task.description, task.assignedTo?.username, task.assignedBy?.username, task.status]
                        .map((x) => x?.toLowerCase() || "")
                        .some((v) => v.includes(search.toLowerCase()))
                    ).map((task) => (
                      <li key={task._id} className="list-group-item">
                        <div className="admin-info">
                          <strong>{task.title}</strong>
                          <small>{task.description}</small>
                          <em>Assigned to: {task.assignedTo?.username || 'N/A'} | By: {task.assignedBy?.username || 'N/A'}</em>
                          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                            <span>📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</span>
                            <span style={{ marginLeft: '15px' }}>📊 Status: {task.status}</span>
                            <span style={{ marginLeft: '15px' }}>⏰ Priority: {task.priority}</span>
                          </div>
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteTask(task._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <p>No tasks found.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activePage === "leaves" && (
            <>
              <div className="content-header">
                <h2>Leave Requests</h2>
                <p>View and manage leave requests.</p>
              </div>

              <div className="content-card">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by employee, type, or status..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className="result-count">Found {leaves.filter((leave) =>
                  [leave.employeeId?.username, leave.employeeId?.email, leave.type, leave.status, leave.reason]
                    .map((x) => x?.toLowerCase() || "")
                    .some((v) => v.includes(search.toLowerCase()))
                ).length} leave request(s)</p>

                {leaves.length > 0 ? (
                  <ul className="list-group">
                    {leaves.filter((leave) =>
                      [leave.employeeId?.username, leave.employeeId?.email, leave.type, leave.status, leave.reason]
                        .map((x) => x?.toLowerCase() || "")
                        .some((v) => v.includes(search.toLowerCase()))
                    ).map((leave) => (
                      <li key={leave._id} className="list-group-item">
                        <div className="admin-info">
                          <strong>{leave.employeeId?.username || 'Unknown'}</strong>
                          <small>{leave.employeeId?.email || 'N/A'}</small>
                          <em>Type: {leave.type} | Status: {leave.status}</em>
                          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                            <span>📅 From: {new Date(leave.startDate).toLocaleDateString()}</span>
                            <span style={{ marginLeft: '15px' }}>📅 To: {new Date(leave.endDate).toLocaleDateString()}</span>
                            <span style={{ marginLeft: '15px' }}>📝 Reason: {leave.reason}</span>
                          </div>
                        </div>
                        <div className="btn-group">
                          {leave.status === 'pending' && (
                            <>
                              <button
                                className="btn btn-outline-success"
                                onClick={() => handleApproveLeave(leave._id)}
                              >
                                <FaToggleOn /> Approve
                              </button>
                              <button
                                className="btn btn-outline-warning"
                                onClick={() => handleRejectLeave(leave._id)}
                              >
                                <FaToggleOff /> Reject
                              </button>
                            </>
                          )}
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
          )}

          {activePage === "messages" && (
            <>
              <div className="content-header">
                <h2>Messages</h2>
                <p>View and manage all messages in the system.</p>
              </div>

              <div className="content-card">
                <div className="search-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by sender, receiver, or content..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <p className="result-count">Found {messages.filter((msg) =>
                  [msg.senderId?.username, msg.receiverId?.username, msg.subject, msg.content]
                    .map((x) => x?.toLowerCase() || "")
                    .some((v) => v.includes(search.toLowerCase()))
                ).length} message(s)</p>

                {messages.length > 0 ? (
                  <ul className="list-group">
                    {messages.filter((msg) =>
                      [msg.senderId?.username, msg.receiverId?.username, msg.subject, msg.content]
                        .map((x) => x?.toLowerCase() || "")
                        .some((v) => v.includes(search.toLowerCase()))
                    ).map((msg) => (
                      <li key={msg._id} className="list-group-item">
                        <div className="admin-info">
                          <strong>{msg.subject}</strong>
                          <small>From: {msg.senderId?.username || 'Unknown'} → To: {msg.receiverId?.username || 'Unknown'}</small>
                          <em>{msg.content}</em>
                          <div style={{ marginTop: '8px', fontSize: '0.85rem', color: '#64748b' }}>
                            <span>📅 {new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="btn-group">
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteMessage(msg._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <p>No messages found.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activePage === "reports" && (
            <>
              <div className="content-header">
                <h2>Reports</h2>
                <p>View system reports and analytics.</p>
              </div>

              <div className="content-card">
                <div className="stats-grid">
                  <div className="stat-card">
                    <h5>Total Users</h5>
                    <h3>{reports.totalUsers || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Admins</h5>
                    <h3>{reports.totalAdmins || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Employees</h5>
                    <h3>{reports.totalEmployees || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Tasks</h5>
                    <h3>{reports.totalTasks || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Leaves</h5>
                    <h3>{reports.totalLeaves || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Total Messages</h5>
                    <h3>{reports.totalMessages || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Active Users</h5>
                    <h3>{reports.activeUsers || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Completed Tasks</h5>
                    <h3>{reports.completedTasks || 0}</h3>
                  </div>
                  <div className="stat-card">
                    <h5>Pending Leaves</h5>
                    <h3>{reports.pendingLeaves || 0}</h3>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePage === "settings" && <SuperAdminSettings />}
        </main>
      </div>
    </>
  );
};

export default SuperAdminDashboard;