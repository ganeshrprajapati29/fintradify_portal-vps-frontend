import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from './Navbar';
import Footer from './Footer';
// import  from "react-icons/fa";
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram,FaAmazon,
  FaUser, FaUserTie, FaUserCog, FaCheckCircle, FaClock,
  FaChartLine, FaShieldAlt, FaStar, FaQuoteLeft, FaRocket,
  FaArrowRight, FaEye, FaEyeSlash, FaLock, FaEnvelope,
  FaKey, FaChevronRight, FaGlobe, FaMobileAlt, FaCloud,
  FaDatabase, FaChartBar, FaUsers, FaBell, FaCalendarAlt,
  FaFileInvoiceDollar, FaCogs, FaHandshake, FaAward, FaHeart,
  FaGoogle, FaMicrosoft, FaApple, FaGithub,
  FaBars, FaTimes, FaSearch, FaHome, FaBriefcase, FaCog,
  FaPhone, FaPlay, FaDownload, FaAndroid, FaApple as FaAppleBrand,
  FaQuestionCircle, FaInfoCircle, FaUserPlus, FaSignInAlt,
  FaBell as FaNotification, FaUserFriends, FaChartPie,
  FaTasks, FaMoneyBillWave, FaGraduationCap, FaFileMedical,
  FaBalanceScale, FaRegBuilding, FaRegClock, FaRegCalendarCheck,
  FaRegChartBar, FaRegUser, FaRegFileAlt, FaRegComments,
  FaRegBell, FaRegStar, FaRegHeart, FaRegThumbsUp, FaGlobeAmericas,
  FaBuilding, FaIndustry, FaStore, FaHospital, FaUniversity,
  FaSchool, FaHotel, FaPlane, FaShip, FaCar, FaTruck,
  FaWarehouse, FaShoppingCart, FaUtensils, FaCoffee,
  FaLandmark, FaMountain, FaTree, FaWater, FaSun,
  FaMoon, FaLaptop, FaMobile, FaTablet, FaDesktop,
  FaServer, FaNetworkWired, FaWifi, FaBluetooth,
  FaCamera, FaVideo, FaMicrophone, FaHeadphones,
  FaKeyboard, FaMouse, FaPrint, FaDatabase as FaDatabaseIcon,
  FaCode, FaTerminal, FaBug, FaTools, FaMagic,
  FaRobot, FaBrain, FaAtom, FaFlask, FaMicroscope,
  FaBook, FaBookOpen, FaGraduationCap as FaGraduationCapSolid,
  FaChalkboardTeacher, FaUserGraduate, FaUserMd, FaUserNinja,
  FaUserSecret, FaUserAstronaut, FaUserCheck, FaUserEdit,
  FaUserMinus, FaUserPlus as FaUserPlusSolid, FaUserShield,
  FaUserTag, FaUserTimes, FaUsersCog, FaUserLock,
  FaUserClock, FaUserCircle, FaUserInjured, FaUserNurse,
  FaUserSecret as FaUserSecretSolid, FaUserTie as FaUserTieSolid,
  FaUserAlt, FaUserAltSlash, FaUserCheck as FaUserCheckSolid,
  FaUserEdit as FaUserEditSolid, FaUserFriends as FaUserFriendsSolid,
  FaUserGraduate as FaUserGraduateSolid, FaUserInjured as FaUserInjuredSolid,
  FaUserMd as FaUserMdSolid, FaUserMinus as FaUserMinusSolid,
  FaUserNinja as FaUserNinjaSolid, FaUserNurse as FaUserNurseSolid,
  FaUserPlus as FaUserPlusSolidIcon, FaUserSecret as FaUserSecretSolidIcon,
  FaUserShield as FaUserShieldSolid, FaUserSlash, FaUserTag as FaUserTagSolid,
  FaUserTimes as FaUserTimesSolid, FaUserTie as FaUserTieSolidIcon,
  FaUser as FaUserSolid, FaIdCard, FaIdCardAlt, FaAddressCard,
  FaAddressBook, FaEnvelopeOpen, FaEnvelopeOpenText,
  FaPhoneSquare, FaPhoneSquareAlt, FaPhoneVolume,
  FaMapMarker, FaMapMarkerAlt, FaMapPin, FaMapSigns,
  FaCompass, FaDirections, FaLocationArrow, FaStreetView,
  FaCrosshairs, FaGlobeAsia, FaGlobeAfrica, FaGlobeEurope,
  FaGlobeAmericas as FaGlobeAmericasSolid, FaFlag, FaFlagCheckered,
  FaFlagUsa, FaMedal, FaTrophy, FaAward as FaAwardSolid,
  FaCrown, FaGem, FaDiamond, FaCoins, FaCreditCard,
  FaMoneyBill, FaMoneyBillAlt, FaMoneyCheck, FaMoneyCheckAlt,
  FaReceipt, FaShoppingBag, FaShoppingBasket, FaStoreAlt,
  FaTags, FaTag, FaTicketAlt, FaQrcode, FaBarcode,
  FaBox, FaBoxOpen, FaBoxes, FaPallet, FaShippingFast,
  FaTruckLoading, FaTruckMoving, FaWarehouse as FaWarehouseSolid,
  FaConveyorBelt, FaForklift, FaDolly, FaDollyFlatbed,
  FaParachuteBox, FaPeopleCarry, FaHandHolding, FaHandHoldingHeart,
  FaHandHoldingUsd, FaHandsHelping, FaHandshake as FaHandshakeSolid,
  FaHandPaper, FaHandPeace, FaHandPointDown, FaHandPointLeft,
  FaHandPointRight, FaHandPointUp, FaHandRock, FaHandScissors,
  FaHandSpock, FaThumbsDown, FaThumbsUp as FaThumbsUpSolid,
  FaRegThumbsDown, FaRegHandPeace, FaRegHandPointDown,
  FaRegHandPointLeft, FaRegHandPointRight, FaRegHandPointUp,
  FaRegHandRock, FaRegHandScissors, FaRegHandSpock,
  FaRegKiss, FaRegKissBeam, FaRegKissWinkHeart,
  FaRegLaugh, FaRegLaughBeam, FaRegLaughSquint,
  FaRegLaughWink, FaRegMeh, FaRegMehBlank, FaRegMehRollingEyes,
  FaRegSadCry, FaRegSadTear, FaRegSmile, FaRegSmileBeam,
  FaRegSmileWink, FaRegSurprise, FaRegTired, FaRegAngry,
  FaRegDizzy, FaRegFlushed, FaRegFrown, FaRegFrownOpen,
  FaRegGrimace, FaRegGrin, FaRegGrinAlt, FaRegGrinBeam,
  FaRegGrinBeamSweat, FaRegGrinHearts, FaRegGrinSquint,
  FaRegGrinSquintTears, FaRegGrinStars, FaRegGrinTears,
  FaRegGrinTongue, FaRegGrinTongueSquint, FaRegGrinTongueWink,
  FaRegGrinWink, FaRegKiss as FaRegKissIcon, FaRegLaugh as FaRegLaughIcon,
  FaRegMeh as FaRegMehIcon, FaRegSadCry as FaRegSadCryIcon,
  FaRegSmile as FaRegSmileIcon, FaRegSurprise as FaRegSurpriseIcon,
  FaRegTired as FaRegTiredIcon, FaRegAngry as FaRegAngryIcon,
  FaRegDizzy as FaRegDizzyIcon, FaRegFlushed as FaRegFlushedIcon,
  FaRegFrown as FaRegFrownIcon, FaRegGrimace as FaRegGrimaceIcon,
  FaRegGrin as FaRegGrinIcon, FaRegGrinAlt as FaRegGrinAltIcon,
  FaRegGrinBeam as FaRegGrinBeamIcon, FaRegGrinHearts as FaRegGrinHeartsIcon,
  FaRegGrinSquint as FaRegGrinSquintIcon, FaRegGrinStars as FaRegGrinStarsIcon,
  FaRegGrinTears as FaRegGrinTearsIcon, FaRegGrinTongue as FaRegGrinTongueIcon,
  FaRegGrinWink as FaRegGrinWinkIcon, FaRegLaughBeam as FaRegLaughBeamIcon,
  FaRegLaughSquint as FaRegLaughSquintIcon, FaRegLaughWink as FaRegLaughWinkIcon,
  FaRegMehBlank as FaRegMehBlankIcon, FaRegMehRollingEyes as FaRegMehRollingEyesIcon,
  FaRegSadTear as FaRegSadTearIcon, FaRegSmileBeam as FaRegSmileBeamIcon,
  FaRegSmileWink as FaRegSmileWinkIcon, FaRegGrinBeamSweat as FaRegGrinBeamSweatIcon,
  FaRegGrinSquintTears as FaRegGrinSquintTearsIcon, FaRegGrinTongueSquint as FaRegGrinTongueSquintIcon,
  FaRegGrinTongueWink as FaRegGrinTongueWinkIcon
} from "react-icons/fa";

const Login = ({ setRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState("login");
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  const loginModalRef = useRef(null);
  const testimonialIntervalRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL?.trim() || "https://steelblue-sheep-699352.hostingersite.com";

  // Close menu when clicking outside
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

  // Auto-open login modal when component mounts (for login page)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // Only auto-open if user is not logged in
    if (!token || !role) {
      setIsLoginModalOpen(true);
    }
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    testimonialIntervalRef.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialIntervalRef.current);
  }, []);

  // OTP Timer
  useEffect(() => {
    let timer;
    if (otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpTimer]);

  // Password strength calculator
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0);
      return;
    }
    let strength = 0;
    if (newPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(newPassword)) strength += 25;
    if (/[0-9]/.test(newPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength += 25;
    setPasswordStrength(strength);
  }, [newPassword]);

  const roles = [
    { 
      key: "employee", 
      label: "Employee", 
      icon: FaUserSolid, 
      color: "#4f46e5",
      gradient: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
      description: "Access attendance, leaves & personal dashboard"
    },
    { 
      key: "admin", 
      label: "HR Admin", 
      icon: FaUserTieSolidIcon, 
      color: "#059669",
      gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
      description: "Manage teams, approvals & analytics"
    },
    { 
      key: "superadmin", 
      label: "Super Admin", 
      icon: FaUserCog, 
      color: "#d97706",
      gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 100%)",
      description: "Full system control & configurations"
    },
  ];

  const navItems = [
    { label: "Home", icon: FaHome, href: "/" },
    { label: "Features", icon: FaBriefcase, href: "/#features" },
    { label: "About", icon: FaInfoCircle, href: "/about" },
    { label: "Contact", icon: FaPhone, href: "/contact" },
    // { label: "Privacy Policy", icon: FaShieldAlt, href: "/privacy-policy" },
  ];

  const features = [
    {
      icon: FaChartBar,
      title: "Advanced Analytics",
      description: "Real-time insights with predictive analytics and custom reporting.",
      color: "#3b82f6",
      stats: "300% ROI"
    },
    {
      icon: FaUsers,
      title: "Team Management",
      description: "Hierarchical team structures with role-based permissions.",
      color: "#10b981",
      stats: "10k+ Teams"
    },
    {
      icon: FaClock,
      title: "Smart Attendance",
      description: "AI-powered attendance tracking with geofencing and biometrics.",
      color: "#8b5cf6",
      stats: "99.9% Accurate"
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description: "Military-grade encryption with SOC2 compliance.",
      color: "#ef4444",
      stats: "Zero Breaches"
    },
    {
      icon: FaCalendarAlt,
      title: "Leave Management",
      description: "Automated leave workflows with policy enforcement.",
      color: "#f59e0b",
      stats: "85% Faster"
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Payroll Processing",
      description: "Automated payroll with tax compliance and reporting.",
      color: "#06b6d4",
      stats: "100% Accurate"
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp Inc.",
      content: "This platform revolutionized our HR operations. The analytics dashboard alone saved us 40 hours per week in reporting time.",
      rating: 5,
      logo: "TC",
      color: "#3b82f6"
    },
    {
      name: "Michael Chen",
      role: "VP Operations",
      company: "Global Solutions",
      content: "Enterprise-grade security with intuitive interface. Our employee satisfaction increased by 35% after implementation.",
      rating: 5,
      logo: "GS",
      color: "#10b981"
    },
    {
      name: "Emily Rodriguez",
      role: "CEO",
      company: "Innovate Labs",
      content: "The ROI was immediate. We reduced HR administration costs by 60% while improving compliance and reporting.",
      rating: 5,
      logo: "IL",
      color: "#8b5cf6"
    },
  ];

  const companies = [
    { name: "Microsoft", icon: FaMicrosoft },
    { name: "Google", icon: FaGoogle },
    { name: "Apple", icon: FaAppleBrand },
    { name: "Amazon", icon: FaAmazon },
    { name: "Facebook", icon: FaFacebookF },
    { name: "IBM", icon: FaServer },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        username,
        password,
        role: selectedRole,
      });

      if (!res.data?.success || !res.data?.token) {
        alert(res.data?.msg || "❌ Login failed");
        return;
      }

      localStorage.setItem("token", res.data.token);
      if (res.data.refreshToken) {
        localStorage.setItem("refreshToken", res.data.refreshToken);
      }

      const role = (res.data?.role || selectedRole).toLowerCase();
      localStorage.setItem("role", role);

      if (rememberMe) {
        localStorage.setItem("rememberedUser", username);
      }

      setRole(role);
      setIsLoginModalOpen(false);
      navigate(`/${role}`);
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/request-reset`, { username });
      alert(res.data?.msg || "OTP sent to your email");
      setStep("reset");
      setOtpTimer(300);
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/confirm-reset`, {
        username,
        otp,
        newPassword,
      });

      if (!res.data?.success) {
        return alert(res.data?.msg || "Failed to reset password");
      }

      alert("✅ Password reset successful. Please login.");
      setStep("login");
      setOtp("");
      setNewPassword("");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Animation keyframes as string
  const animationCSS = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <>
    <Navbar/>
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#1f2937'
    }}>
      <style>{animationCSS}</style>


      {/* Login Modal */}
      {isLoginModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          <div
            ref={loginModalRef}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '2.5rem',
              maxWidth: '450px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              animation: 'slideUp 0.3s ease'
            }}
          >
            <button
              onClick={() => setIsLoginModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: '#6b7280',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '50%',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#374151';
              }}
            >
              <FaTimes />
            </button>

            <div style={{
              textAlign: 'center',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '1.5rem'
              }}>
                <FaLock style={{ color: '#fff' }} />
              </div>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                marginBottom: '0.5rem',
                color: '#111827'
              }}>
                {step === "login" ? "Welcome Back" : 
                 step === "forgot" ? "Reset Password" : 
                 "Create New Password"}
              </h2>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                {step === "login" ? `Sign in to access your HR portal` :
                 step === "forgot" ? "Enter your email to receive OTP" :
                 "Enter OTP and new password"}
              </p>
            </div>

            {/* Role Selection in Modal */}
            {step === "login" && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#374151'
                }}>
                  Select Role
                </label>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = selectedRole === role.key;
                    return (
                      <button
                        key={role.key}
                        type="button"
                        onClick={() => setSelectedRole(role.key)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem',
                          background: isSelected ? role.gradient : '#f9fafb',
                          border: `1px solid ${isSelected ? 'transparent' : '#e5e7eb'}`,
                          borderRadius: '12px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Icon style={{
                          fontSize: '1.25rem',
                          color: isSelected ? '#fff' : role.color
                        }} />
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: isSelected ? '#fff' : '#374151'
                        }}>
                          {role.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Login Form */}
            {step === "login" && (
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151'
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <FaEnvelope style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem 0.875rem 3rem',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        color: '#111827',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = '#fff';
                        e.target.style.borderColor = '#4f46e5';
                        e.target.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.background = '#f9fafb';
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <label style={{
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: '#374151'
                    }}>
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setStep("forgot")}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#4f46e5',
                        fontSize: '0.875rem',
                        cursor: 'pointer',
                        padding: 0,
                        fontWeight: 500
                      }}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <FaLock style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#9ca3af'
                    }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.875rem 3rem',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        color: '#111827',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '2rem'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    color: '#6b7280'
                  }}>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ 
                        width: '16px', 
                        height: '16px',
                        accentColor: '#4f46e5'
                      }}
                    />
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: loading ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        borderRadius: '50%',
                        animation: 'rotate 1s linear infinite'
                      }} />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <div style={{
                  textAlign: 'center',
                  marginTop: '2rem',
                  color: '#6b7280',
                  fontSize: '0.875rem'
                }}>
                  Or continue with
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginTop: '1rem'
                }}>
                  <button type="button" style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontWeight: 500
                  }}>
                    <FaGoogle color="#DB4437" />
                    Google
                  </button>
                  <button type="button" style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    color: '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    fontWeight: 500
                  }}>
                    <FaMicrosoft color="#00A4EF" />
                    Microsoft
                  </button>
                </div>
              </form>
            )}

            {/* Forgot Password Form */}
            {step === "forgot" && (
              <form onSubmit={handleRequestOTP}>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151'
                  }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: '#f9fafb',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      fontSize: '0.95rem',
                      color: '#111827',
                      transition: 'all 0.3s ease'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("login")}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'transparent',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '1rem'
                  }}
                >
                  Back to Login
                </button>
              </form>
            )}

            {/* Reset Password Form */}
            {step === "reset" && (
              <form onSubmit={handleConfirmReset}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151'
                  }}>
                    OTP Code
                  </label>
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'center'
                  }}>
                    {[0,1,2,3,4,5].map((index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ''}
                        onChange={(e) => {
                          const newOtp = otp.split('');
                          newOtp[index] = e.target.value;
                          setOtp(newOtp.join(''));
                          if (e.target.value && index < 5) {
                            const nextInput = e.target.parentElement?.children[index + 1];
                            nextInput?.focus();
                          }
                        }}
                        style={{
                          width: '3rem',
                          height: '3rem',
                          fontSize: '1.25rem',
                          textAlign: 'center',
                          background: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          color: '#111827',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    ))}
                  </div>
                  {otpTimer > 0 && (
                    <div style={{
                      textAlign: 'center',
                      marginTop: '0.5rem',
                      fontSize: '0.875rem',
                      color: otpTimer < 60 ? '#ef4444' : '#f59e0b'
                    }}>
                      OTP expires in: {formatTime(otpTimer)}
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151'
                  }}>
                    New Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '0.875rem 3rem 0.875rem 1rem',
                        background: '#f9fafb',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        color: '#111827',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      style={{
                        position: 'absolute',
                        right: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#9ca3af',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                    >
                      {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem'
                    }}>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#6b7280'
                      }}>
                        Password strength
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: passwordStrength < 50 ? '#ef4444' : 
                               passwordStrength < 75 ? '#f59e0b' : '#10b981'
                      }}>
                        {passwordStrength < 50 ? 'Weak' : 
                         passwordStrength < 75 ? 'Good' : 'Strong'}
                      </span>
                    </div>
                    <div style={{
                      height: '4px',
                      background: '#e5e7eb',
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${passwordStrength}%`,
                        background: passwordStrength < 50 ? '#ef4444' : 
                                   passwordStrength < 75 ? '#f59e0b' : '#10b981',
                        borderRadius: '2px',
                        transition: 'all 0.3s ease'
                      }} />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || passwordStrength < 50}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: passwordStrength < 50 ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: passwordStrength < 50 ? 0.5 : 1
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>

                <button
                  type="button"
                  onClick={() => setStep("login")}
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'transparent',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    color: '#374151',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '1rem'
                  }}
                >
                  Back to Login
                </button>
              </form>
            )}

            <div style={{
              textAlign: 'center',
              marginTop: '2rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Don't have an account?{' '}
                <button
                  onClick={() => scrollToSection('contact')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#4f46e5',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}
                >
                  Contact Sales
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
<section
  id="home"
  style={{
    minHeight: "100vh",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
    padding: "6rem 2rem",
  }}
>
  {/* Soft Background Shapes */}
  <div
    style={{
      position: "absolute",
      top: "-120px",
      right: "-120px",
      width: "400px",
      height: "400px",
      background: "#eef2ff",
      borderRadius: "50%",
      zIndex: 0,
    }}
  />
  <div
    style={{
      position: "absolute",
      bottom: "-150px",
      left: "-150px",
      width: "450px",
      height: "450px",
      background: "#f3f4f6",
      borderRadius: "50%",
      zIndex: 0,
    }}
  />

  <div
    style={{
      maxWidth: "1300px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "4rem",
      justifyContent: "space-between",
    }}
  >
    {/* LEFT CONTENT */}
    <div style={{ flex: "1 1 500px", maxWidth: "600px" }}>
      <span
        style={{
          background: "#eef2ff",
          color: "#4f46e5",
          padding: "0.5rem 1rem",
          borderRadius: "999px",
          fontWeight: 600,
          fontSize: "0.9rem",
        }}
      >
        Smart HR Automation Platform
      </span>

      <h1
        style={{
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          fontWeight: 800,
          lineHeight: 1.2,
          margin: "1.5rem 0",
          color: "#111827",
        }}
      >
        Manage Workforce with
        <br />
        <span style={{ color: "#4f46e5" }}>Real-Time Insights</span>
      </h1>

      <p
        style={{
          fontSize: "1.1rem",
          color: "#6b7280",
          marginBottom: "2.5rem",
          lineHeight: 1.7,
        }}
      >
        Unified HR dashboard to track attendance, payroll, employee
        performance, and compliance. Designed for modern teams that want
        automation and clarity.
      </p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          style={{
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            padding: "1rem 2rem",
            borderRadius: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Get Started
        </button>

        <button
          onClick={() => scrollToSection("features")}
          style={{
            background: "transparent",
            border: "2px solid #4f46e5",
            color: "#4f46e5",
            padding: "1rem 2rem",
            borderRadius: "12px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View Features
        </button>
      </div>
    </div>

    {/* RIGHT DASHBOARD */}
    <div
      style={{
        flex: "1 1 550px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "20px",
        padding: "2rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      }}
    >
      {/* Dashboard Header */}
      <div
        style={{
          fontWeight: 700,
          fontSize: "1.1rem",
          marginBottom: "1.5rem",
          color: "#111827",
        }}
      >
        Employee Analytics Dashboard
      </div>

      {/* Fake Chart Area */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "12px",
            height: "140px",
          }}
        >
          {[40, 80, 55, 90, 65, 100, 75].map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${h}%`,
                background: "#4f46e5",
                borderRadius: "6px 6px 0 0",
                opacity: 0.9,
              }}
            />
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {[
          { label: "Attendance", value: "98%" },
          { label: "Productivity", value: "92%" },
          { label: "Payroll Accuracy", value: "100%" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              flex: "1 1 150px",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "1rem",
            }}
          >
            <div style={{ fontSize: "1.3rem", fontWeight: 700 }}>
              {item.value}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>  
     <section
  style={{
    padding: "3rem 2rem",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  {/* Floating SVG Icons Background */}
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 1440 400"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 0,
      opacity: 0.04,
    }}
  >
    <g fill="#4f46e5">
      <circle cx="200" cy="80" r="40" />
      <rect x="500" y="120" width="70" height="70" rx="12" />
      <polygon points="900,60 940,120 860,120" />
      <circle cx="1200" cy="200" r="50" />
      <rect x="300" y="260" width="90" height="90" rx="16" />
      <polygon points="700,260 760,340 640,340" />
    </g>
  </svg>

  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      textAlign: "center",
      position: "relative",
      zIndex: 1,
    }}
  >
    {/* Animated Info Banner */}
    <div
      style={{
        background:
          "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
        padding: "1.5rem 2rem",
        borderRadius: "18px",
        boxShadow: "0 15px 35px rgba(79,70,229,0.25)",
        marginBottom: "2.5rem",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "inline-block",
          animation: "scrollText 18s linear infinite",
          color: "#fff",
          fontSize: "1.15rem",
          fontWeight: 600,
        }}
      >
        Fintradify HR Portal | Workforce Automation |
        Real-Time Analytics | Team Collaboration |
        Attendance Intelligence | Payroll Simplified |
        Enterprise Security | Global Trusted Platform
      </div>
    </div>

    {/* Navigation Cards */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "1.6rem",
      }}
    >
      {[
        { icon: FaHome, title: "Home", desc: "Main Dashboard", color: "#4f46e5" },
        { icon: FaBriefcase, title: "Features", desc: "Platform Tools", color: "#059669" },
        { icon: FaInfoCircle, title: "About", desc: "Company Info", color: "#d97706" },
        { icon: FaPhone, title: "Contact", desc: "Reach Support", color: "#dc2626" },
        { icon: FaUsers, title: "Team", desc: "Meet Experts", color: "#0891b2" },
      ].map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(10px)",
              padding: "1.6rem",
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = item.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.borderColor = "#e5e7eb";
            }}
            onClick={() => {
              if (item.title === "Home") window.location.href = "/";
              else if (item.title === "Features") window.location.href = "/features";
              else if (item.title === "About") window.location.href = "/about";
              else if (item.title === "Contact") window.location.href = "/contact";
              else if (item.title === "Team") window.location.href = "/about";
            }}
          >
            <Icon
              style={{
                fontSize: "2rem",
                color: item.color,
                marginBottom: "0.7rem",
              }}
            />
            <h3
              style={{
                fontSize: "1.15rem",
                fontWeight: 600,
                color: "#111827",
                marginBottom: "0.4rem",
              }}
            >
              {item.title}
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#6b7280", margin: 0 }}>
              {item.desc}
            </p>
          </div>
        );
      })}
    </div>
  </div>

  {/* Text Animation */}
  <style>
    {`
      @keyframes scrollText {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}
  </style>
</section>
<section
  id="features"
  style={{
    padding: "7rem 2rem",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Animated Gradient Blob */}
  <svg
    viewBox="0 0 800 600"
    style={{
      position: "absolute",
      top: "-150px",
      right: "-150px",
      width: "600px",
      opacity: 0.07,
      zIndex: 0,
    }}
  >
    <path fill="#4f46e5">
      <animate
        attributeName="d"
        dur="12s"
        repeatCount="indefinite"
        values="
        M421,312Q381,374,308,401Q235,428,177,381Q119,334,115,257Q111,180,184,146Q257,112,334,120Q411,128,437,194Q463,260,421,312Z;
        M405,305Q365,360,300,395Q235,430,175,385Q115,340,120,265Q125,190,185,150Q245,110,325,120Q405,130,440,195Q475,260,405,305Z;
        M421,312Q381,374,308,401Q235,428,177,381Q119,334,115,257Q111,180,184,146Q257,112,334,120Q411,128,437,194Q463,260,421,312Z
      "
      />
    </path>
  </svg>

  <div
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
    }}
  >
    {/* Title */}
    <div style={{ textAlign: "center", marginBottom: "5rem" }}>
      <h2
        style={{
          fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
          fontWeight: 800,
          color: "#111827",
        }}
      >
        How Fintradify Transforms
        <br />
        <span style={{ color: "#4f46e5" }}>HR Workflow</span>
      </h2>

      <p
        style={{
          marginTop: "1rem",
          color: "#6b7280",
          fontSize: "1.1rem",
          maxWidth: "650px",
          marginInline: "auto",
        }}
      >
        A unified system that connects people, payroll and productivity
        into one intelligent platform.
      </p>
    </div>

    {/* Timeline */}
    <div
      style={{
        position: "relative",
        paddingLeft: "40px",
        borderLeft: "3px solid #e5e7eb",
      }}
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;

        return (
          <div
            key={index}
            style={{
              marginBottom: "3.5rem",
              position: "relative",
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: "absolute",
                left: "-52px",
                top: "10px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: feature.color,
                boxShadow: "0 0 0 6px #fff",
              }}
            />

            {/* Card */}
            <div
              style={{
                background: "#f9fafb",
                padding: "2rem",
                borderRadius: "18px",
                border: "1px solid #e5e7eb",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateX(10px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateX(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", gap: "1rem" }}>
                <div
                  style={{
                    width: "54px",
                    height: "54px",
                    background: feature.color,
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon style={{ color: "#fff", fontSize: "1.4rem" }} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 700,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      color: "#6b7280",
                      marginBottom: "0.8rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </p>

                  <span
                    style={{
                      background: feature.color,
                      color: "#fff",
                      padding: "0.3rem 0.8rem",
                      borderRadius: "999px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {feature.stats}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>


    <section
  style={{
    padding: "2.5rem 2rem 6rem",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
    marginTop: "-60px",
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
      alignItems: "center",
      gap: "4rem",
    }}
  >
    {/* LEFT SIDE */}
    <div>
      <h2
        style={{
          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
          fontWeight: 800,
          marginBottom: "1.2rem",
          color: "#111827",
        }}
      >
        FINHR Mobile Platform
      </h2>

      <p
        style={{
          fontSize: "1.05rem",
          color: "#6b7280",
          lineHeight: 1.7,
          marginBottom: "2.5rem",
        }}
      >
        A powerful mobile extension of Fintradify HR Portal.  
        Manage employees, payroll, approvals and analytics —
        securely from anywhere in real time.
      </p>

      {/* FEATURE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "1.2rem",
        }}
      >
        {[
          { icon: FaBell, text: "Smart Alerts" },
          { icon: FaChartLine, text: "Live Analytics" },
          { icon: FaShieldAlt, text: "Biometric Security" },
          { icon: FaCloud, text: "Cloud Sync" },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                background: "#f9fafb",
                padding: "0.9rem 1.2rem",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#111827",
              }}
            >
              <Icon style={{ color: "#4f46e5" }} />
              {item.text}
            </div>
          );
        })}
      </div>
    </div>

    {/* PHONE SIDE */}
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "270px",
          height: "540px",
          borderRadius: "38px",
          background: "#111827",
          padding: "14px",
          boxShadow: "0 30px 60px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "28px",
            background: "#ffffff",
            overflow: "hidden",
            position: "relative",
          }}
        >
          {/* LOGO HEADER */}
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}
          >
            <img
              src="https://i.ibb.co/n8Yy967T/Whats-App-Image-2025-06-16-at-16-09-13-951ea81f.png"
              alt="Fintradify"
              style={{ height: "34px" }}
            />
          </div>

          {/* SVG APP BACKGROUND */}
          <svg
            viewBox="0 0 300 500"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              opacity: 0.08,
            }}
          >
            <path fill="#4f46e5">
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                values="
                M0,120C80,200,220,60,300,140V0H0Z;
                M0,160C120,80,200,220,300,160V0H0Z;
                M0,120C80,200,220,60,300,140V0H0Z
              "
              />
            </path>
          </svg>

          {/* AD SLIDES */}
          <div
            style={{
              position: "absolute",
              top: "70px",
              width: "100%",
              height: "calc(100% - 70px)",
            }}
          >
            {[
              {
                icon: FaBell,
                title: "Instant Notifications",
                text: "Attendance & approval alerts",
                bg: "#eef2ff",
              },
              {
                icon: FaChartLine,
                title: "Workforce Insights",
                text: "Live HR analytics",
                bg: "#ecfdf5",
              },
              {
                icon: FaShieldAlt,
                title: "Secure Access",
                text: "Biometric authentication",
                bg: "#fff7ed",
              },
            ].map((slide, i) => {
              const Icon = slide.icon;
              return (
                <div
                  key={i}
                  className="slide"
                  style={{ background: slide.bg }}
                >
                  <Icon
                    style={{
                      fontSize: "2rem",
                      color: "#4f46e5",
                      marginBottom: "0.5rem",
                    }}
                  />
                  <h4 style={{ margin: "0.3rem 0" }}>
                    {slide.title}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "#555" }}>
                    {slide.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* ANIMATION CSS */}
  <style>
    {`
      .slide {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 1.5rem;
        animation: slideAnim 12s infinite;
        opacity: 0;
      }

      .slide:nth-child(1) { animation-delay: 0s; }
      .slide:nth-child(2) { animation-delay: 4s; }
      .slide:nth-child(3) { animation-delay: 8s; }

      @keyframes slideAnim {
        0% { opacity: 0; transform: translateX(40px); }
        8% { opacity: 1; transform: translateX(0); }
        30% { opacity: 1; }
        38% { opacity: 0; transform: translateX(-40px); }
        100% { opacity: 0; }
      }
    `}
  </style>
</section>
<section
  style={{
    padding: "7rem 2rem",
    background: "#ffffff",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* Animated Background Blob */}
  <svg
    viewBox="0 0 800 600"
    style={{
      position: "absolute",
      top: "-120px",
      right: "-120px",
      width: "600px",
      opacity: 0.06,
      zIndex: 0,
    }}
  >
    <path fill="#4f46e5">
      <animate
        attributeName="d"
        dur="12s"
        repeatCount="indefinite"
        values="
        M421,312Q381,374,308,401Q235,428,177,381Q119,334,115,257Q111,180,184,146Q257,112,334,120Q411,128,437,194Q463,260,421,312Z;
        M405,305Q365,360,300,395Q235,430,175,385Q115,340,120,265Q125,190,185,150Q245,110,325,120Q405,130,440,195Q475,260,405,305Z;
        M421,312Q381,374,308,401Q235,428,177,381Q119,334,115,257Q111,180,184,146Q257,112,334,120Q411,128,437,194Q463,260,421,312Z
      "
      />
    </path>
  </svg>

  <div
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative",
      zIndex: 1,
      textAlign: "center",
    }}
  >
    {/* CENTER TITLE */}
    <h2
      style={{
        fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
        fontWeight: 800,
        color: "#111827",
        marginBottom: "1rem",
      }}
    >
      FINHR Mobile Ecosystem
    </h2>

    <p
      style={{
        fontSize: "1.1rem",
        color: "#6b7280",
        maxWidth: "650px",
        margin: "0 auto 5rem",
        lineHeight: 1.7,
      }}
    >
      A connected mobile environment where attendance,
      payroll, approvals and insights work together seamlessly.
    </p>

    {/* FLOATING FEATURE CLOUD */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "2rem",
      }}
    >
      {[
        {
          icon: FaUsers,
          title: "Employee Hub",
          desc: "All workforce records in one mobile dashboard.",
        },
        {
          icon: FaClock,
          title: "Attendance AI",
          desc: "GPS tracking with smart automation.",
        },
        {
          icon: FaMoneyBillWave,
          title: "Payroll Engine",
          desc: "Salary approvals & finance control.",
        },
        {
          icon: FaChartPie,
          title: "Analytics Core",
          desc: "Real-time HR intelligence.",
        },
        {
          icon: FaShieldAlt,
          title: "Security Layer",
          desc: "Biometric & encrypted login.",
        },
        {
          icon: FaCloud,
          title: "Cloud Sync",
          desc: "Instant multi-device updates.",
        },
      ].map((item, i) => {
        const Icon = item.icon;

        return (
          <div
            key={i}
            style={{
              background: "#f9fafb",
              padding: "2rem",
              borderRadius: "22px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
              transition: "all 0.3s ease",
              animation: `floatCard ${4 + i * 0.5}s ease-in-out infinite`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow =
                "0 20px 45px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.05)";
            }}
          >
            <Icon
              style={{
                fontSize: "2rem",
                color: "#4f46e5",
                marginBottom: "1rem",
              }}
            />
            <h3 style={{ fontWeight: 700 }}>{item.title}</h3>
            <p style={{ color: "#6b7280" }}>{item.desc}</p>
          </div>
        );
      })}
    </div>
  </div>

  {/* FLOAT ANIMATION */}
  <style>
    {`
      @keyframes floatCard {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-12px); }
        100% { transform: translateY(0px); }
      }
    `}
  </style>
</section>



    </div>
    <Footer/>
    </>
  );
};

export default Login;