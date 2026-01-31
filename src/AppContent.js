import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

// Dashboard Components
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

// Page Components
import Login from './components/Login';
import CreateEmployee from './pages/CreateEmployee';
import EmployeeAttendance from './pages/EmployeeAttendance';
import EmployeeProfile from './pages/EmployeeProfile';
import SalarySlipPage from './pages/SalarySlipPage';
import AdminTaskPage from './pages/AdminTaskPage';
import EmployeeTaskPage from './pages/EmployeeTaskPage';
import EmployeeForm from './pages/EmployeeForm';
import AdminMessages from './pages/AdminMessages';
import AttendanceLeaveDashboard from './pages/AttendanceLeaveDashboard';
import AboutPage from './pages/AboutPage';
import ContactUs from './pages/ContactUs';
import HRPortalFeatures from './pages/HRPortalFeatures';
import EmployeeAttendanceLeaveDashboard from './pages/EmployeeAttendanceLeaveDashboard';
import HRPortalPolicies from './pages/HrPortalPolicies';
import SuperAdminSettings from './pages/SuperAdminSettings';
import EmployeeSettings from './pages/EmployeeSettings';
import AdminSettings from './pages/AdminSettings';
import SuperAdminEmployees from './pages/SuperAdminEmployees';
import SuperAdminTasks from './pages/SuperAdminTasks';
import SuperAdminLeaves from './pages/SuperAdminLeaves';
import SuperAdminMessages from './pages/SuperAdminMessages';
import SuperAdminReports from './pages/SuperAdminReports';
import AttendanceTracking from './pages/AttendanceTracking';
import LeaveManagement from './pages/LeaveManagement';
import PayrollProcessing from './pages/PayrollProcessing';
import PerformanceReviews from './pages/PerformanceReviews';
import Recruitment from './pages/Recruitment';
import Onboarding from './pages/Onboarding';
import Training from './pages/Training';
import Compliance from './pages/Compliance';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FeaturesPage from './pages/FeaturesPage';
import SolutionsPage from './pages/SolutionsPage';

function AppContent() {
  const [role, setRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Restore role and path from localStorage on refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    const savedPath = localStorage.getItem("savedPath");
    if (savedRole) {
      setRole(savedRole);
      if (savedPath && savedPath !== "/" && savedPath !== "/login") {
        navigate(savedPath, { replace: true });
      }
    }
  }, [navigate]);

  // ✅ Save current path to localStorage when location changes (if logged in)
  useEffect(() => {
    if (role && location.pathname !== "/" && location.pathname !== "/login") {
      localStorage.setItem("savedPath", location.pathname);
    }
  }, [location.pathname, role]);

  // ✅ Save role when user logs in
  const handleSetRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
    const defaultPath = `/${newRole}`;
    localStorage.setItem("savedPath", defaultPath);
    navigate(defaultPath);
  };

  // ✅ Protected Route wrapper
  const ProtectedRoute = ({ allowedRoles, children }) => {
    if (!role) {
      return <Navigate to="/login" replace />; // not logged in → go to login
    }
    
    // Allow multiple roles if needed, or single role
    if (typeof allowedRoles === 'string') {
      if (role !== allowedRoles) {
        return <Navigate to="/login" replace />; // wrong role → go to login
      }
    } else if (Array.isArray(allowedRoles)) {
      if (!allowedRoles.includes(role)) {
        return <Navigate to="/login" replace />; // role not in allowed list → go to login
      }
    }
    
    return children;
  };

  // ✅ Public Route wrapper (only for non-authenticated users)
  const PublicRoute = ({ children }) => {
    if (role) {
      // If user is already logged in, redirect to their dashboard
      return <Navigate to={`/${role}`} replace />;
    }
    return children;
  };

  return (
    <Routes>
      {/* Redirect root to /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* ✅ Login Route - Public only */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login setRole={handleSetRole} />
          </PublicRoute>
        } 
      />

      {/* ✅ Super Admin Routes */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ Admin Dashboard */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ✅ Create Employee Page (Admin Only) */}
      <Route
        path="/admin/create-employee"
        element={
          <ProtectedRoute allowedRoles="admin">
            <CreateEmployee />
          </ProtectedRoute>
        }
      />

      {/* ✅ Edit Employee Page (Admin Only) */}
      <Route
        path="/admin/edit-employee/:id"
        element={
          <ProtectedRoute allowedRoles="admin">
            <CreateEmployee /> {/* same form will be used for edit */}
          </ProtectedRoute>
        }
      />

      {/* ✅ Employee Dashboard */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute allowedRoles="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/attendance" 
        element={
          <ProtectedRoute allowedRoles="admin">
            <EmployeeAttendance />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/task" 
        element={
          <ProtectedRoute allowedRoles="admin">
            <AdminTaskPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/messages" 
        element={
          <ProtectedRoute allowedRoles="admin">
            <AdminMessages />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/settings" 
        element={
          <ProtectedRoute allowedRoles="admin">
            <AdminSettings />
          </ProtectedRoute>
        } 
      />

      {/* Employee Routes */}
      <Route 
        path="/employee/profile" 
        element={
          <ProtectedRoute allowedRoles="employee">
            <EmployeeProfile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employee/task" 
        element={
          <ProtectedRoute allowedRoles="employee">
            <EmployeeTaskPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employee/form" 
        element={
          <ProtectedRoute allowedRoles="employee">
            <EmployeeForm />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employee/settings" 
        element={
          <ProtectedRoute allowedRoles="employee">
            <EmployeeSettings />
          </ProtectedRoute>
        } 
      />

      {/* Shared Routes (for multiple roles) */}
      <Route 
        path="/salary/slip" 
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <SalarySlipPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/attendance/leave" 
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <AttendanceLeaveDashboard />
          </ProtectedRoute>
        } 
      />

      {/* Super Admin Specific Routes */}
      <Route 
        path="/superadmin/settings" 
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminSettings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/employees" 
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminEmployees />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/tasks" 
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminTasks />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/leaves" 
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminLeaves />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/messages" 
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminMessages />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/superadmin/reports" 
        element={
          <ProtectedRoute allowedRoles="superadmin">
            <SuperAdminReports />
          </ProtectedRoute>
        } 
      />

      {/* HR Module Routes */}
      <Route 
        path="/attendance-tracking" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <AttendanceTracking />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/leave-management" 
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <LeaveManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/payroll-processing" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <PayrollProcessing />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/performance-reviews" 
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <PerformanceReviews />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/recruitment" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Recruitment />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
            <Onboarding />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/training" 
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <Training />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/compliance" 
        element={
          <ProtectedRoute allowedRoles={['employee', 'admin', 'superadmin']}>
            <Compliance />
          </ProtectedRoute>
        } 
      />

      {/* Public Pages */}
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/features" element={<FeaturesPage />} />
      <Route path="/solutions" element={<SolutionsPage />} />
      <Route path="/hr/features" element={<HRPortalFeatures />} />
      <Route path="/employee/guide" element={<EmployeeAttendanceLeaveDashboard />} />
      <Route path="/hr/policies" element={<HRPortalPolicies />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      {/* <Route path="/hr/features" element={<HRPortalFeatures />} /> */}
      <Route path="/termsOfService" element={<TermsOfService />} />
      

      {/* 404 Route */}
      <Route path="*" element={<Navigate to={role ? `/${role}` : "/login"} replace />} />
    </Routes>
  );
}

export default AppContent;