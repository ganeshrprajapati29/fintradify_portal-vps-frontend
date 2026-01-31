import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaBars, FaTimes, FaUserShield, FaUsers, FaCog, FaSignOutAlt, FaUserFriends, FaTasks, FaCalendarAlt, FaEnvelope, FaChartBar, FaHome, FaBriefcase, FaInfoCircle, FaPhone, FaShieldAlt } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const user = localStorage.getItem('username');

    if (token && role && user) {
      setUserRole(role);
      setUsername(user);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("savedPath");
      setUserRole(null);
      setUsername('');
      navigate("/");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const publicNavItems = [
    { label: "Home", icon: FaHome, href: "/" },
    { label: "Features", icon: FaBriefcase, href: "/features" },
    { label: "About", icon: FaInfoCircle, href: "/about" },
    { label: "Contact", icon: FaPhone, href: "/contact" },
    { label: "Privacy Policy", icon: FaShieldAlt, href: "/privacy-policy" },
  ];

  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: FaUserShield, path: userRole === 'superadmin' ? '/superadmin' : userRole === 'admin' ? '/admin' : '/employee' },
    { key: "admins", label: "Manage Admins", icon: FaUsers, path: '/superadmin/admins', roles: ['superadmin'] },
    { key: "employees", label: "Manage Employees", icon: FaUserFriends, path: '/superadmin/employees', roles: ['superadmin'] },
    { key: "tasks", label: "Tasks", icon: FaTasks, path: userRole === 'superadmin' ? '/superadmin/tasks' : userRole === 'admin' ? '/admin/tasks' : '/employee/tasks' },
    { key: "leaves", label: "Leave Requests", icon: FaCalendarAlt, path: userRole === 'superadmin' ? '/superadmin/leaves' : userRole === 'admin' ? '/admin/leaves' : '/employee/leaves' },
    { key: "messages", label: "Messages", icon: FaEnvelope, path: userRole === 'superadmin' ? '/superadmin/messages' : userRole === 'admin' ? '/admin/messages' : '/employee/messages' },
    { key: "reports", label: "Reports", icon: FaChartBar, path: '/superadmin/reports', roles: ['superadmin'] },
    { key: "settings", label: "Settings", icon: FaCog, path: userRole === 'superadmin' ? '/superadmin/settings' : userRole === 'admin' ? '/admin/settings' : '/employee/settings' },
  ];

  const filteredMenuItems = menuItems.filter(item => !item.roles || item.roles.includes(userRole));

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .navbar-custom {
          position: relative;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 2px solid rgba(2, 132, 199, 0.1);
          box-shadow: 0 4px 20px rgba(2, 132, 199, 0.1);
          min-height: 70px;
          width: 100%;
          margin-bottom: 20px;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #0284c7;
          font-weight: 800;
          font-size: 1.5rem;
          flex-shrink: 0;
          margin-right: 20px;
          cursor: pointer;
        }

        .navbar-brand img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          margin-right: 12px;
          border: 2px solid rgba(2, 132, 199, 0.2);
        }

        .navbar-marquee {
          flex: 1;
          text-align: center;
          margin: 0 20px;
          overflow: hidden;
          min-width: 0;
        }

        .navbar-marquee marquee {
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
          margin-left: 20px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #0284c7;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .user-info span {
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.1) 0%, rgba(3, 105, 161, 0.1) 100%);
          padding: 6px 12px;
          border-radius: 20px;
          border: 1px solid rgba(2, 132, 199, 0.2);
        }

        .btn-custom {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          border: none;
          color: #fff;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          text-decoration: none;
        }

        .btn-custom:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(2, 132, 199, 0.4);
        }

        .btn-logout {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .btn-logout:hover {
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        .menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #0284c7;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: rgba(2, 132, 199, 0.1);
        }

        .mobile-menu {
          position: fixed;
          top: 70px;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 2px solid rgba(2, 132, 199, 0.1);
          box-shadow: 0 4px 20px rgba(2, 132, 199, 0.1);
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1049;
        }

        .mobile-menu.open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-list {
          list-style: none;
          padding: 20px;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mobile-menu-item {
          border-bottom: 1px solid rgba(2, 132, 199, 0.1);
        }

        .mobile-menu-item:last-child {
          border-bottom: none;
        }

        .mobile-menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 0;
          color: #475569;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          border-radius: 8px;
          padding-left: 15px;
        }

        .mobile-menu-link:hover {
          background: rgba(2, 132, 199, 0.08);
          color: #0284c7;
          transform: translateX(8px);
        }

        .mobile-menu-link svg {
          font-size: 1.2rem;
        }

        @media (max-width: 768px) {
          .navbar-marquee {
            display: none;
          }

          .menu-toggle {
            display: block;
          }

          .navbar-actions {
            gap: 10px;
          }

          .user-info {
            display: none;
          }

          .btn-custom {
            padding: 8px 16px;
            font-size: 0.8rem;
          }
        }

        @media (max-width: 576px) {
          .navbar-container {
            padding: 0 15px;
          }

          .navbar-brand {
            font-size: 1.3rem;
          }

          .navbar-brand img {
            width: 40px;
            height: 40px;
          }

          .mobile-menu-list {
            padding: 15px;
          }

          .mobile-menu-link {
            padding: 12px 0;
            font-size: 0.9rem;
          }
        }
      `}</style>

      <nav className="navbar-custom">
        <div className="navbar-container">
          {/* Logo on the left */}
          <Link to="/" className="navbar-brand">
            <div style={{
              width: '45px',
              height: '45px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 'bold' }}>F</span>
            </div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                lineHeight: 1
              }}>
                Fintradify
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                fontWeight: 500
              }}>
                HR Portal Pro
              </div>
            </div>
          </Link>

          {/* Marquee in the center */}
          <div className="navbar-marquee">
            <marquee behavior="scroll" direction="left">
              Welcome to Fintradify HR Portal - Simplifying Workforce Management
            </marquee>
          </div>

          {/* Actions on the right */}
          <div className="navbar-actions">
            {userRole && username && (
              <div className="user-info">
                <span>👤 {username}</span>
              </div>
            )}

            {userRole ? (
              <>
                <button className="menu-toggle" onClick={toggleMenu}>
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
                <button className="btn-custom btn-logout" onClick={handleLogout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <button className="btn-custom" onClick={handleLoginClick}>
                <FaSignInAlt />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {userRole && (
          <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul className="mobile-menu-list">
              {filteredMenuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <li key={item.key} className="mobile-menu-item">
                    <Link
                      className="mobile-menu-link"
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
