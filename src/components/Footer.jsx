import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaAndroid,
  FaApple,
  FaDownload,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Solutions", path: "/solutions" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer
      style={{
        background: "#ffffff",
        color: "#111827",
        padding: "4rem 0 1.5rem",
        borderTop: "1px solid #e5e7eb",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SVG Icon Background */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.04,
        }}
      >
        <defs>
          <pattern
            id="iconPattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            <text x="10" y="50" fontSize="40" fill="#4f46e5">⚙</text>
            <text x="60" y="90" fontSize="40" fill="#6366f1">📊</text>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#iconPattern)" />
      </svg>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          {/* Company Logo */}
          <div>
            <img
              src="https://i.ibb.co/n8Yy967T/Whats-App-Image-2025-06-16-at-16-09-13-951ea81f.png" // 👉 replace with your logo path
              alt="Fintradify Logo"
              style={{
                width: "160px",
                marginBottom: "1rem",
              }}
            />

            <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
              Simplifying workforce management with modern HR automation and
              analytics tools for growing teams.
            </p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube].map(
                (Icon, i) => (
                  <Icon
                    key={i}
                    style={{
                      fontSize: "1.3rem",
                      color: "#6b7280",
                      cursor: "pointer",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#4f46e5";
                      e.currentTarget.style.transform = "scale(1.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#6b7280";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: "1rem" }}>
              Quick Links
            </h4>

            {links.map((item, i) => (
              <p
                key={i}
                onClick={() => handleNav(item.path)}
                style={{
                  color: "#6b7280",
                  margin: "0.5rem 0",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#4f46e5")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#6b7280")
                }
              >
                {item.name}
              </p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: "1rem" }}>
              Contact Info
            </h4>

            <p style={{ color: "#6b7280" }}>
              <FaMapMarkerAlt color="#4f46e5" /> Noida, UP 201301
            </p>

            <p style={{ color: "#6b7280" }}>
              <FaPhone color="#4f46e5" /> +91 78360 09907
            </p>

            <p style={{ color: "#6b7280" }}>
              <FaEnvelope color="#4f46e5" /> support@fintradify.com
            </p>
          </div>

          {/* App Download */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: "1rem" }}>
              Download App
            </h4>

            <a
              href="https://play.google.com/store/apps/details?id=com.hr.fintradify"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "#f9fafb",
                  padding: "0.9rem 1rem",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontWeight: 600,
                  border: "1px solid #e5e7eb",
                  cursor: "pointer",
                }}
              >
                <FaAndroid color="#10B981" />
                Google Play
                <FaDownload style={{ marginLeft: "auto" }} />
              </div>
            </a>

            <div
              style={{
                marginTop: "1rem",
                background: "#f3f4f6",
                padding: "0.9rem 1rem",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
                color: "#6b7280",
                fontWeight: 600,
                border: "1px dashed #d1d5db",
              }}
            >
              <FaApple />
              Coming Soon
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "1.5rem",
            textAlign: "center",
            color: "#6b7280",
            fontSize: "0.9rem",
          }}
        >
          © {new Date().getFullYear()} Fintradify. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
