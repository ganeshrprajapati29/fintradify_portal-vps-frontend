import React from "react";
import {
  FaUsers,
  FaShieldAlt,
  FaRocket,
  FaHeart,
  FaCheckCircle,
} from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
      <style>{`
        * { box-sizing:border-box; }

        .about-wrapper {
          position:relative;
          background:#ffffff;
          overflow:hidden;
        }

        /* SVG grid background */
        .bg-grid {
          position:absolute;
          inset:0;
          opacity:0.04;
          z-index:0;
        }

        .container {
          max-width:1200px;
          margin:auto;
          padding:80px 20px;
          position:relative;
          z-index:1;
        }

        .hero {
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          padding-top:100px;
          padding-bottom:60px;
        }

        .hero h1 {
          font-size:3rem;
          font-weight:900;
          color:#111827;
          margin-bottom:12px;
        }

        .hero p {
          max-width:700px;
          color:#6b7280;
          font-size:1.1rem;
        }

        .section-title {
          font-size:2.2rem;
          font-weight:800;
          margin-bottom:20px;
          color:#111827;
        }

        .two-col {
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:50px;
          align-items:center;
        }

        .muted {
          color:#6b7280;
          line-height:1.7;
        }

        .check-list li {
          list-style:none;
          margin-bottom:12px;
          display:flex;
          align-items:center;
          gap:10px;
          font-weight:600;
        }

        .values-grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
          gap:25px;
        }

        .card {
          background:#fff;
          border:1px solid #e5e7eb;
          padding:28px;
          border-radius:18px;
          transition:.3s;
        }

        .card:hover {
          transform:translateY(-6px);
          box-shadow:0 20px 40px rgba(0,0,0,.06);
        }

        .icon {
          font-size:36px;
          color:#4f46e5;
          margin-bottom:12px;
        }

        .cta {
          text-align:center;
          padding-top:20px;
        }

        .btn {
          background:#4f46e5;
          color:white;
          border:none;
          padding:14px 34px;
          border-radius:30px;
          font-weight:700;
          cursor:pointer;
          transition:.3s;
        }

        .btn:hover {
          background:#4338ca;
          transform:translateY(-2px);
        }

        @media(max-width:768px){
          .two-col {
            grid-template-columns:1fr;
          }

          .hero h1 {
            font-size:2.3rem;
          }
        }
      `}</style>

      <div className="about-wrapper">

        {/* SVG Grid Pattern */}
        <svg className="bg-grid" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

       <section
  style={{
    position: "relative",
    overflow: "hidden",
    background: "#ffffff",
  }}
>
  {/* Diagonal SVG Background */}
  <svg
    viewBox="0 0 1440 400"
    preserveAspectRatio="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      opacity: 0.08,
      zIndex: 0,
    }}
  >
    <polygon points="0,0 1440,0 1440,280" fill="#4f46e5">
      <animate
        attributeName="points"
        dur="10s"
        repeatCount="indefinite"
        values="
        0,0 1440,0 1440,280;
        0,0 1440,0 1440,240;
        0,0 1440,0 1440,280
        "
      />
    </polygon>
  </svg>

  {/* Soft radial glow */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(circle at center, rgba(79,70,229,0.15), transparent 60%)",
      zIndex: 0,
    }}
  />

  {/* Floating abstract circles */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.05,
      zIndex: 0,
    }}
  >
    <circle cx="20%" cy="30%" r="80" fill="#4f46e5">
      <animate attributeName="cy" values="30%;40%;30%" dur="12s" repeatCount="indefinite" />
    </circle>

    <circle cx="80%" cy="60%" r="120" fill="#6366f1">
      <animate attributeName="cy" values="60%;50%;60%" dur="14s" repeatCount="indefinite" />
    </circle>
  </svg>

  {/* Content */}
  <div
    style={{
      position: "relative",
      zIndex: 1,
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "130px 20px 100px",
      textAlign: "center",
    }}
  >
    <h1
      style={{
        fontSize: "3rem",
        fontWeight: 900,
        color: "#111827",
        marginBottom: "12px",
      }}
    >
      About Fintradify
    </h1>

    <p
      style={{
        color: "#6b7280",
        fontSize: "1.1rem",
        lineHeight: 1.7,
      }}
    >
      Modern HR infrastructure built for growing organizations.
      We simplify workforce management through automation,
      analytics, and elegant design.
    </p>
  </div>
</section>

<section
  style={{
    position: "relative",
    overflow: "hidden",
    background: "#ffffff",
  }}
>
  {/* SVG Grid Background */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.04,
      zIndex: 0,
    }}
  >
    <defs>
      <pattern id="gridPattern" width="40" height="40" patternUnits="userSpaceOnUse">
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="#4f46e5"
          strokeWidth="1"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridPattern)" />
  </svg>

  {/* Floating Animated Icons */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.06,
      zIndex: 0,
    }}
  >
    <circle cx="15%" cy="30%" r="35" fill="#4f46e5">
      <animate attributeName="cy" values="30%;38%;30%" dur="9s" repeatCount="indefinite" />
    </circle>

    <rect x="80%" y="65%" width="50" height="50" fill="#6366f1">
      <animate attributeName="y" values="65%;55%;65%" dur="11s" repeatCount="indefinite" />
    </rect>

    <polygon points="300,120 340,190 260,190" fill="#818cf8">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 300 160"
        to="360 300 160"
        dur="18s"
        repeatCount="indefinite"
      />
    </polygon>

    <circle cx="60%" cy="20%" r="25" fill="#a5b4fc">
      <animate attributeName="cy" values="20%;28%;20%" dur="13s" repeatCount="indefinite" />
    </circle>
  </svg>

  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "100px 20px",
      position: "relative",
      zIndex: 1,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "60px",
      alignItems: "center",
    }}
  >
    {/* Left Content */}
    <div>
      <h2
        style={{
          fontSize: "2.2rem",
          fontWeight: 900,
          color: "#111827",
          marginBottom: "20px",
        }}
      >
        Our Mission
      </h2>

      <p
        style={{
          color: "#6b7280",
          lineHeight: 1.8,
          fontSize: "1.05rem",
        }}
      >
        Fintradify exists to remove complexity from HR. We design intuitive
        systems that empower teams to focus on people, not paperwork.
        Our platform enables organizations to scale efficiently while
        maintaining transparency, automation, and enterprise-level security.
      </p>

      <ul style={{ marginTop: 25, padding: 0 }}>
        {[
          "Simplify HR operations",
          "Enterprise-grade tools for all teams",
          "Secure & compliant infrastructure",
          "Built for long-term growth",
        ].map((item, i) => (
          <li
            key={i}
            style={{
              listStyle: "none",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            <FaCheckCircle color="#10b981" />
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Right Highlight Card */}
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          color: "#4b5563",
          fontSize: "1.05rem",
          lineHeight: 1.8,
        }}
      >
        We believe HR should feel invisible — powerful systems operating
        quietly in the background while teams focus on culture,
        productivity, and innovation. Our mission is to give organizations
        clarity, control, and confidence in managing their workforce.
      </p>
    </div>
  </div>
</section>

<section
  style={{
    position: "relative",
    overflow: "hidden",
    background: "#ffffff",
  }}
>
  {/* SVG Grid Background */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.04,
      zIndex: 0,
    }}
  >
    <defs>
      <pattern id="valuesGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#4f46e5" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#valuesGrid)" />
  </svg>

  {/* Floating animated shapes */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.06,
      zIndex: 0,
    }}
  >
    <circle cx="10%" cy="20%" r="30" fill="#6366f1">
      <animate attributeName="cy" values="20%;28%;20%" dur="10s" repeatCount="indefinite" />
    </circle>

    <circle cx="90%" cy="70%" r="45" fill="#818cf8">
      <animate attributeName="cy" values="70%;60%;70%" dur="12s" repeatCount="indefinite" />
    </circle>

    <polygon points="500,120 540,200 460,200" fill="#4f46e5">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 500 160"
        to="360 500 160"
        dur="20s"
        repeatCount="indefinite"
      />
    </polygon>
  </svg>

  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "100px 20px",
      position: "relative",
      zIndex: 1,
      textAlign: "center",
    }}
  >
    <h2
      style={{
        fontSize: "2.3rem",
        fontWeight: 900,
        color: "#111827",
        marginBottom: "50px",
      }}
    >
      Core Values
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "30px",
      }}
    >
      {[
        { icon: FaUsers, title: "People First", text: "Every feature improves human experience." },
        { icon: FaShieldAlt, title: "Security", text: "Enterprise-grade data protection." },
        { icon: FaRocket, title: "Innovation", text: "We evolve with modern technology." },
        { icon: FaHeart, title: "Passion", text: "We care deeply about HR excellence." },
      ].map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              padding: "35px",
              borderRadius: "22px",
              transition: "0.3s",
              backdropFilter: "blur(10px)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <Icon
              style={{
                fontSize: "42px",
                color: "#4f46e5",
                marginBottom: "15px",
              }}
            />
            <h4 style={{ fontWeight: 700, marginBottom: "10px" }}>
              {item.title}
            </h4>
            <p style={{ color: "#6b7280", lineHeight: 1.7 }}>
              {item.text}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

        {/* STORY + CTA COMBINED */}
<section
  style={{
    position: "relative",
    overflow: "hidden",
    background: "#ffffff",
  }}
>
  {/* SVG background mesh */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.05,
      zIndex: 0,
    }}
  >
    <defs>
      <pattern id="mesh" width="60" height="60" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="2" fill="#4f46e5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#mesh)" />
  </svg>

  {/* animated diagonal path */}
  <svg
    width="100%"
    height="100%"
    style={{
      position: "absolute",
      inset: 0,
      opacity: 0.06,
      zIndex: 0,
    }}
  >
    <path stroke="#4f46e5" strokeWidth="3" fill="none">
      <animate
        attributeName="d"
        dur="12s"
        repeatCount="indefinite"
        values="
        M0 200 L1440 80;
        M0 180 L1440 120;
        M0 200 L1440 80
        "
      />
    </path>
  </svg>

  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "110px 20px",
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: "60px",
      alignItems: "center",
      position: "relative",
      zIndex: 1,
    }}
  >
    {/* STORY */}
    <div>
      <h2
        style={{
          fontSize: "2.4rem",
          fontWeight: 900,
          color: "#111827",
          marginBottom: "20px",
        }}
      >
        Our Story
      </h2>

      <p
        style={{
          color: "#6b7280",
          lineHeight: 1.9,
          fontSize: "1.08rem",
        }}
      >
        Fintradify was built to democratize HR infrastructure. From startups
        to enterprises, our platform adapts to every scale. Today we support
        organizations worldwide in building smarter, more productive,
        and happier workplaces through intelligent automation and modern design.
      </p>
    </div>

    {/* CTA PANEL */}
    <div
      style={{
        background: "linear-gradient(135deg,#4f46e5,#6366f1)",
        color: "#fff",
        padding: "50px",
        borderRadius: "30px",
        boxShadow: "0 30px 60px rgba(79,70,229,0.35)",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontSize: "1.9rem",
          fontWeight: 900,
          marginBottom: "15px",
        }}
      >
        Ready to Get Started?
      </h3>

      <p
        style={{
          opacity: 0.9,
          marginBottom: "28px",
          fontSize: "1.05rem",
        }}
      >
        Join teams already transforming HR with Fintradify.
      </p>

      <a href="/login">
        <button
          style={{
            background: "#ffffff",
            color: "#4f46e5",
            border: "none",
            padding: "16px 40px",
            borderRadius: "40px",
            fontWeight: 900,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          Start Free Today
        </button>
      </a>
    </div>
  </div>
</section>

      </div>
    </>
  );
};

export default AboutPage;
