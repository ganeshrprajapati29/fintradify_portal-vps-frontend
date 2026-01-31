import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
    { label: "Privacy Policy", icon: FaShieldAlt, href: "/privacy-policy" },
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
    <div style={{
      minHeight: '100vh',
      background: '#ffffff',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      color: '#1f2937'
    }}>
      <style>{animationCSS}</style>

      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        zIndex: 1000,
        padding: '1rem 2rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            cursor: 'pointer'
          }} onClick={() => scrollToSection('home')}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaBriefcase style={{ color: '#fff', fontSize: '1.25rem' }} />
            </div>
            <div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1
              }}>
                Fintradify
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                fontWeight: 500
              }}>
                Complete HR Management Solution
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#4b5563',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    padding: '0.5rem 0',
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#4f46e5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#4b5563';
                  }}
                >
                  <Icon style={{ fontSize: '1rem' }} />
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(79, 70, 229, 0.4)';
              }}
            >
              <FaSignInAlt />
              Login
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'transparent',
                color: '#4f46e5',
                border: '2px solid #4f46e5',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#4f46e5';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#4f46e5';
              }}
            >
              <FaPhone />
              Contact Sales
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                display: { md: 'none' },
                background: 'transparent',
                border: 'none',
                color: '#4f46e5',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            borderTop: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '1rem',
            animation: 'slideUp 0.3s ease'
          }}>
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                    setIsMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: '#4b5563',
                    textDecoration: 'none',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    marginBottom: '0.25rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.color = '#4f46e5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#4b5563';
                  }}
                >
                  <Icon />
                  {item.label}
                </a>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#4f46e5',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
                justifyContent: 'center',
                marginTop: '1rem'
              }}
            >
              <FaPhone />
              Contact Sales
            </button>
          </div>
        )}
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

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '6rem 2rem 4rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4rem'
          }}>
            {/* Left Content */}
            <div style={{
              flex: 1,
              maxWidth: '600px'
            }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.1))',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                marginBottom: '1.5rem'
              }}>
                <FaAwardSolid style={{ color: '#4f46e5' }} />
                <span style={{
                  color: '#4f46e5',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  Trusted by 10,000+ Organizations
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1.5rem',
                color: '#111827'
              }}>
                Transform Your{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  HR Operations
                </span>
              </h1>

              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                color: '#6b7280',
                marginBottom: '2.5rem',
                lineHeight: 1.6
              }}>
                Enterprise-grade HR management platform that automates attendance, 
                leave management, payroll, and performance tracking. 
                Designed for modern organizations to boost productivity and compliance.
              </p>

              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                marginBottom: '3rem'
              }}>
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(79, 70, 229, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(79, 70, 229, 0.4)';
                  }}
                >
                  <FaRocket />
                  Start Free Trial
                </button>

                <button
                  onClick={() => scrollToSection('features')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: 'transparent',
                    color: '#4f46e5',
                    border: '2px solid #4f46e5',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#4f46e5';
                  }}
                >
                  <FaPlay />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { value: "99.9%", label: "Uptime" },
                  { value: "24/7", label: "Support" },
                  { value: "500k+", label: "Users" },
                  { value: "50+", label: "Countries" }
                ].map((stat, i) => (
                  <div key={i}>
                    <div style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: '0.25rem'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Hero Image/Illustration */}
            <div style={{
              flex: 1,
              maxWidth: '600px',
              position: 'relative'
            }}>
              <div style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                border: '1px solid #e5e7eb',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}>
                {/* Dashboard Preview */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} style={{
                      height: '80px',
                      background: i % 2 === 0 ? '#4f46e5' : '#7c3aed',
                      borderRadius: '12px',
                      opacity: 0.8 - (i * 0.1)
                    }} />
                  ))}
                </div>
                
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    flex: 2,
                    height: '120px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    borderRadius: '12px'
                  }} />
                  <div style={{
                    flex: 1,
                    height: '120px',
                    background: '#10b981',
                    borderRadius: '12px'
                  }} />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <FaChartLine style={{ color: 'white' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: '0.25rem'
                    }}>
                      Real-time Analytics Dashboard
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      Monitor HR metrics in real-time
                    </div>
                  </div>
                  <FaArrowRight style={{ color: '#4f46e5' }} />
                </div>
              </div>

              {/* Floating Elements */}
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                borderRadius: '20px',
                transform: 'rotate(15deg)',
                animation: 'float 6s ease-in-out infinite',
                opacity: 0.8
              }} />
              <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '120px',
                height: '120px',
                background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                borderRadius: '20px',
                transform: 'rotate(-15deg)',
                animation: 'float 8s ease-in-out infinite',
                opacity: 0.8
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '6rem 2rem',
        background: '#f9fafb'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(124, 58, 237, 0.1))',
              padding: '0.5rem 1.5rem',
              borderRadius: '20px',
              marginBottom: '1rem'
            }}>
              <span style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}>
                POWERFUL FEATURES
              </span>
            </div>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#111827'
            }}>
              Everything You Need for
              <span style={{
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}>
                Modern HR Management
              </span>
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Comprehensive tools designed to streamline every aspect of human resources management
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid #e5e7eb',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: `linear-gradient(135deg, ${feature.color}, ${feature.color}88)`,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem'
                  }}>
                    <Icon style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    color: '#111827'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1.5rem',
                    lineHeight: 1.6
                  }}>
                    {feature.description}
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{
                      background: `linear-gradient(135deg, ${feature.color}, ${feature.color}88)`,
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      color: '#fff'
                    }}>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trusted Companies */}
          <div style={{
            textAlign: 'center',
            paddingTop: '4rem',
            borderTop: '1px solid #e5e7eb'
          }}>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              fontSize: '1.125rem'
            }}>
              Trusted by industry leaders worldwide
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '3rem',
              opacity: 0.7
            }}>
              {companies.map((company, i) => {
                const Icon = company.icon;
                return (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#374151',
                    fontSize: '1.25rem',
                    fontWeight: 600
                  }}>
                    <Icon />
                    <span>{company.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" style={{
        padding: '6rem 2rem',
        background: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              marginBottom: '1rem',
              color: '#111827'
            }}>
              Trusted by Industry Leaders
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              See what executives from top companies have to say about our platform
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                style={{
                  background: index === activeTestimonial ? '#f9fafb' : 'white',
                  border: `1px solid ${index === activeTestimonial ? '#4f46e5' : '#e5e7eb'}`,
                  borderRadius: '20px',
                  padding: '2.5rem',
                  transition: 'all 0.4s ease',
                  opacity: index === activeTestimonial ? 1 : 0.7,
                  transform: index === activeTestimonial ? 'scale(1.02)' : 'scale(1)',
                  maxWidth: '800px',
                  width: '100%',
                  cursor: 'pointer'
                }}
                onClick={() => setActiveTestimonial(index)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: testimonial.color,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#fff'
                  }}>
                    {testimonial.logo}
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: 600,
                      color: '#111827',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </h4>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
                <p style={{
                  color: '#4b5563',
                  lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  fontStyle: 'italic',
                  fontSize: '1.125rem'
                }}>
                  "{testimonial.content}"
                </p>
                <div style={{
                  display: 'flex',
                  gap: '0.25rem'
                }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} style={{ color: '#f59e0b' }} />
                  ))}
                </div>
              </div>
            ))}
            
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginTop: '2rem'
            }}>
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: index === activeTestimonial ? '#4f46e5' : '#e5e7eb',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          <FaMobileAlt style={{
            fontSize: '4rem',
            marginBottom: '2rem',
            animation: 'float 4s ease-in-out infinite'
          }} />
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            Download Our Mobile App
          </h2>
          <p style={{
            fontSize: '1.125rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}>
            Manage your HR tasks on the go with our feature-rich mobile app. 
            Available on both Android and iOS platforms.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'white',
                color: '#111827',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
            >
              <FaAndroid style={{ color: '#10B981', fontSize: '1.5rem' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>GET IT ON</div>
                <div style={{ fontSize: '1.25rem' }}>Google Play</div>
              </div>
            </a>

            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: '#111827',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              }}
            >
              <FaAppleBrand style={{ fontSize: '1.5rem' }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Download on the</div>
                <div style={{ fontSize: '1.25rem' }}>App Store</div>
              </div>
            </a>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '3rem',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: FaBell, text: "Push Notifications" },
              { icon: FaCloud, text: "Cloud Sync" },
              { icon: FaShieldAlt, text: "Biometric Login" },
              { icon: FaChartLine, text: "Mobile Analytics" }
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Icon />
                  <span style={{ fontSize: '0.875rem' }}>{feature.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#111827',
        color: 'white',
        padding: '4rem 2rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '3rem',
            marginBottom: '4rem'
          }}>
            {/* Company Info */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaBriefcase style={{ color: '#fff', fontSize: '1.25rem' }} />
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
                    color: '#9ca3af',
                    fontWeight: 500
                  }}>
                    Complete HR Management Solution
                  </div>
                </div>
              </div>
              <p style={{
                color: '#9ca3af',
                lineHeight: 1.6,
                marginBottom: '1.5rem'
              }}>
                Transforming HR operations with cutting-edge technology. 
                Streamline your workforce management with our comprehensive platform.
              </p>
              <div style={{
                display: 'flex',
                gap: '1rem'
              }}>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  background: '#1f2937',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}>
                  <FaFacebookF />
                </a>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  background: '#1f2937',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}>
                  <FaTwitter />
                </a>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  background: '#1f2937',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}>
                  <FaLinkedinIn />
                </a>
                <a href="#" style={{
                  width: '40px',
                  height: '40px',
                  background: '#1f2937',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none'
                }}>
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#f9fafb'
              }}>
                Quick Links
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  { label: "Home", href: "/" },
                  { label: "Features", href: "/#features" },
                  { label: "About Us", href: "/about" },
                  { label: "Contact", href: "/contact" },
                  { label: "Privacy Policy", href: "/privacy-policy" }
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.75rem' }}>
                    <a href={item.href} style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <FaChevronRight style={{ fontSize: '0.75rem' }} />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#f9fafb'
              }}>
                Solutions
              </h4>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0
              }}>
                {[
                  "Attendance Tracking",
                  "Leave Management",
                  "Payroll Processing",
                  "Performance Reviews",
                  "Recruitment",
                  "Onboarding",
                  "Training",
                  "Compliance"
                ].map((item, i) => (
                  <li key={i} style={{ marginBottom: '0.75rem' }}>
                    <a href="#" style={{
                      color: '#9ca3af',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease'
                    }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & App Download */}
            <div>
              <h4 style={{
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem',
                color: '#f9fafb'
              }}>
                Contact & Download
              </h4>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <FaEnvelope style={{ color: '#4f46e5' }} />
                  <span style={{ color: '#9ca3af' }}>support@hrportal.com</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  <FaPhone style={{ color: '#4f46e5' }} />
                  <span style={{ color: '#9ca3af' }}>+1 (555) 123-4567</span>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <FaGlobe style={{ color: '#4f46e5' }} />
                  <span style={{ color: '#9ca3af' }}>www.hr.fintradify.com</span>
                </div>
              </div>

              {/* App Download Links */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <a
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#1f2937',
                    color: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                  }}
                >
                  <FaAndroid style={{ color: '#10B981', fontSize: '1.25rem' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Download on</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>Google Play</div>
                  </div>
                  <FaDownload />
                </a>

                <a
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    background: '#1f2937',
                    color: 'white',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#4f46e5';
                  }}
                >
                  <FaAppleBrand style={{ fontSize: '1.25rem' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>Download on</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600 }}>App Store</div>
                  </div>
                  <FaDownload />
                </a>
              </div>
            </div>
          </div>

          <hr style={{
            border: 'none',
            height: '1px',
            background: '#374151',
            margin: '2rem 0'
          }} />

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{
              color: '#9ca3af',
              fontSize: '0.875rem'
            }}>
              © {new Date().getFullYear()} Fintradify. All rights reserved.
            </div>
            <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <a href="/privacy-policy" style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}>
                Privacy Policy
              </a>
              <a href="/contact" style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}>
                Contact Us
              </a>
              <a href="/about" style={{
                color: '#9ca3af',
                fontSize: '0.875rem',
                textDecoration: 'none'
              }}>
                About Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Login;