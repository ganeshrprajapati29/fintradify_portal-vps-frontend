import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaSignInAlt, FaBars, FaTimes, FaUserShield, FaUsers, FaCog, FaSignOutAlt, FaUserFriends, FaTasks, FaCalendarAlt, FaEnvelope, FaChartBar, FaHome, FaBriefcase, FaInfoCircle, FaPhone, FaShieldAlt, FaEye, FaEyeSlash, FaLock, FaEnvelope as FaEnvelopeIcon, FaKey, FaChevronRight, FaGlobe, FaMobileAlt, FaCloud, FaDatabase, FaChartBar as FaChartBarIcon, FaUsers as FaUsersIcon, FaBell, FaCalendarAlt as FaCalendarAltIcon, FaFileInvoiceDollar, FaCogs, FaHandshake, FaAward, FaHeart, FaGoogle, FaMicrosoft, FaApple, FaGithub, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaAmazon, FaUser, FaUserTie, FaUserCog as FaUserCogIcon, FaCheckCircle, FaClock, FaChartLine, FaShieldAlt as FaShieldAltIcon, FaStar, FaQuoteLeft, FaRocket, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const loginModalRef = useRef(null);

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
    setIsLoginModalOpen(true);
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

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginModalRef.current && !loginModalRef.current.contains(event.target)) {
        setIsLoginModalOpen(false);
      }
    };

    if (isLoginModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLoginModalOpen]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('username', user.username);
      localStorage.setItem('role', user.role);

      setUserRole(user.role);
      setUsername(user.username);
      setIsLoginModalOpen(false);
      setLoginData({ email: '', password: '' });

      // Navigate to appropriate dashboard
      const defaultPath = user.role === 'superadmin' ? '/superadmin' : user.role === 'admin' ? '/admin' : '/employee';
      localStorage.setItem("savedPath", defaultPath);
      navigate(defaultPath);

    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

        .menu-toggle {
          display: none;
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

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-left: 20px;
        }

        .desktop-nav-link {
          color: #0284c7;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .desktop-nav-link:hover {
          background: rgba(2, 132, 199, 0.1);
          color: #0369a1;
          transform: translateY(-1px);
        }

        .desktop-nav-link svg {
          font-size: 1rem;
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
          z-index: 99999;
          max-height: calc(100vh - 70px);
          overflow-y: auto;
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

          .desktop-nav {
            display: none;
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

          {/* Desktop Navigation Links */}
          <div className="desktop-nav">
            {publicNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className="desktop-nav-link"
                >
                  <IconComponent />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Actions on the right */}
          <div className="navbar-actions">
            {userRole && username && (
              <div className="user-info">
                <span>{username}</span>
              </div>
            )}

            {/* Always show menu toggle for navigation */}
            <button className="menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Show login/logout button */}
            {userRole ? (
              <button className="btn-custom btn-logout" onClick={handleLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <button className="btn-custom" onClick={handleLoginClick}>
                <FaSignInAlt />
                Login
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu - Always show all options */}
        <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-menu-list">
            {/* Public Navigation Items */}
            {publicNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.label} className="mobile-menu-item">
                  <Link
                    className="mobile-menu-link"
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent />
                    {item.label}
                  </Link>
                </li>
              );
            })}

            {/* Separator */}
            {userRole && <li style={{ borderBottom: '2px solid rgba(2, 132, 199, 0.2)', margin: '10px 0' }}></li>}

            {/* User-specific menu items */}
            {userRole && filteredMenuItems.map((item) => {
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
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1050,
          backdropFilter: 'blur(5px)'
        }}>
          <div
            ref={loginModalRef}
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '2rem',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              position: 'relative',
              animation: 'modalSlideIn 0.3s ease-out'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLoginModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '0.5rem',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#6b7280';
              }}
            >
              ×
            </button>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <FaLock style={{ color: '#fff', fontSize: '1.5rem' }} />
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: '#111827',
                marginBottom: '0.5rem'
              }}>
                Welcome Back
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Sign in to your Fintradify account
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit}>
              {/* Email Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <FaEnvelopeIcon style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    fontSize: '1rem'
                  }} />
                  <input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#4f46e5';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <FaKey style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    fontSize: '1rem'
                  }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    placeholder="Enter your password"
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      transition: 'all 0.2s ease',
                      outline: 'none'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#4f46e5';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#9ca3af',
                      padding: '0.25rem'
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem'
                }}>
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: '0.875rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280'
              }}>
                Need help? Contact our support team
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
