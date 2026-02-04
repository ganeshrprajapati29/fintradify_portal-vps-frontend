import React from "react";
import { FaUserClock, FaFileAlt, FaUsers, FaChartLine, FaCalendarCheck, FaFileInvoiceDollar, FaTasks, FaEnvelope, FaShieldAlt, FaGlobe, FaCheckCircle } from "react-icons/fa";

const FeaturesPage = () => {
  const features = [
    {
      icon: FaUserClock,
      title: "Smart Attendance Tracking",
      description: "Monitor employee attendance with geofencing, biometric integration, and real-time reporting.",
      benefits: ["GPS tracking", "Biometric login", "Mobile check-in/out", "Overtime calculation"]
    },
    {
      icon: FaFileAlt,
      title: "Digital Document Management",
      description: "Securely store and manage all employee documents with version control and easy access.",
      benefits: ["Document storage", "Version control", "Secure sharing", "Audit trails"]
    },
    {
      icon: FaUsers,
      title: "Employee Self-Service Portal",
      description: "Empower employees with self-service capabilities for leave requests, profile updates, and more.",
      benefits: ["Leave applications", "Profile management", "Pay slip access", "Self-service tools"]
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics Dashboard",
      description: "Get comprehensive insights with customizable reports and predictive analytics.",
      benefits: ["Performance metrics", "Custom reports", "Trend analysis", "Data visualization"]
    },
    {
      icon: FaCalendarCheck,
      title: "Leave Management System",
      description: "Streamline leave requests, approvals, and tracking with automated workflows.",
      benefits: ["Leave policies", "Approval workflows", "Balance tracking", "Holiday calendar"]
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Payroll Processing",
      description: "Automated payroll calculations with tax compliance and direct salary deposits.",
      benefits: ["Tax calculations", "Salary processing", "Direct deposits", "Compliance reports"]
    },
    {
      icon: FaTasks,
      title: "Task & Project Management",
      description: "Manage projects, assign tasks, and track progress with collaborative tools.",
      benefits: ["Task assignments", "Progress tracking", "Team collaboration", "Deadline management"]
    },
    {
      icon: FaEnvelope,
      title: "Integrated Communication",
      description: "Built-in messaging system for announcements, feedback, and team communication.",
      benefits: ["Internal messaging", "Announcements", "Feedback system", "Notifications"]
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description: "Bank-grade security with encryption, compliance, and data protection.",
      benefits: ["Data encryption", "SOC2 compliance", "Access controls", "Regular backups"]
    },
    {
      icon: FaGlobe,
      title: "Multi-Platform Access",
      description: "Access your HR data anywhere with web and mobile applications.",
      benefits: ["Web dashboard", "Mobile app", "Cloud sync", "Offline access"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-features py-5 text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">
            Powerful Features for Modern HR
          </h1>
          <p className="lead mb-0">
            Discover all the tools you need to manage your workforce effectively
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="col-lg-6">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-start gap-3">
                        <div className="icon">
                          <Icon size={40} className="text-primary" />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-bold mb-3">{feature.title}</h5>
                          <p className="text-muted mb-3">{feature.description}</p>
                          <ul className="list-unstyled">
                            {feature.benefits.map((benefit, i) => (
                              <li key={i} className="mb-2 d-flex align-items-center">
                                <FaCheckCircle className="text-success me-2" size={14} />
                                <span className="small">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="fw-bold text-primary mb-4">Experience All Features Free</h2>
          <p className="lead mb-4">
            Start using Fintradify today and unlock all these powerful features at no cost.
          </p>
          <a href="/login" className="btn btn-primary btn-lg px-5">
            Get Started Free
          </a>
        </div>
      </section>

      <style jsx>{`

      .hero-features {
  min-height: 420px;
  display: flex;
  align-items: center;

  background: linear-gradient(
      rgba(0, 0, 0, 0.55),
      rgba(0, 0, 0, 0.55)
    ),
    url("https://www.cjr.org/wp-content/uploads/2016/12/tow-design-hero.jpg")
      no-repeat center center;

  background-size: cover;
}
        .card {
          transition: 0.3s;
          border-radius: 16px;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 25px rgba(0, 123, 255, 0.15);
        }

        .icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.1), rgba(13, 110, 253, 0.05));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
      `}</style>
    </>
  );
};

export default FeaturesPage;
