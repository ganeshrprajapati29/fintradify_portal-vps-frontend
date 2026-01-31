import React from "react";
import { FaUsers, FaShieldAlt, FaRocket, FaChartLine, FaCalendarAlt, FaFileInvoiceDollar, FaTasks, FaEnvelope, FaGlobe, FaCheckCircle } from "react-icons/fa";

const SolutionsPage = () => {
  const solutions = [
    {
      icon: FaUsers,
      title: "Employee Management",
      description: "Complete employee lifecycle management from onboarding to offboarding with automated workflows.",
      features: ["Digital onboarding", "Employee profiles", "Document management", "Role assignments"]
    },
    {
      icon: FaCalendarAlt,
      title: "Attendance & Leave",
      description: "Smart attendance tracking and leave management with real-time monitoring and approvals.",
      features: ["Biometric integration", "Leave policies", "Overtime tracking", "Shift scheduling"]
    },
    {
      icon: FaFileInvoiceDollar,
      title: "Payroll Processing",
      description: "Automated payroll calculations, tax compliance, and salary disbursements.",
      features: ["Tax calculations", "Salary slips", "Direct deposits", "Compliance reports"]
    },
    {
      icon: FaTasks,
      title: "Task Management",
      description: "Streamline project workflows with task assignments, tracking, and performance analytics.",
      features: ["Task assignments", "Progress tracking", "Deadline management", "Performance metrics"]
    },
    {
      icon: FaEnvelope,
      title: "Communication Hub",
      description: "Integrated messaging system for seamless communication across the organization.",
      features: ["Internal messaging", "Announcements", "Feedback system", "Notifications"]
    },
    {
      icon: FaChartLine,
      title: "Analytics & Reporting",
      description: "Comprehensive analytics dashboard with customizable reports and insights.",
      features: ["Performance reports", "Attendance analytics", "Productivity metrics", "Custom dashboards"]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">HR Solutions for Modern Businesses</h1>
          <p className="lead mb-0">
            Comprehensive HR solutions designed to streamline operations and boost productivity
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold text-primary mb-3">Our Solutions</h2>
              <p className="text-muted lead">
                End-to-end HR solutions tailored for businesses of all sizes
              </p>
            </div>
          </div>

          <div className="row g-4">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <div key={index} className="col-lg-6 col-xl-4">
                  <div className="card h-100 shadow-sm border-0">
                    <div className="card-body p-4 text-center">
                      <div className="icon mb-3">
                        <Icon size={50} className="text-primary" />
                      </div>
                      <h5 className="fw-bold mb-3">{solution.title}</h5>
                      <p className="text-muted mb-4">{solution.description}</p>
                      <ul className="list-unstyled text-start">
                        {solution.features.map((feature, i) => (
                          <li key={i} className="mb-2 d-flex align-items-center">
                            <FaCheckCircle className="text-success me-2" size={16} />
                            <span className="small">{feature}</span>
                          </li>
                        ))}
                      </ul>
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
          <h2 className="fw-bold text-primary mb-4">Ready to Transform Your HR Operations?</h2>
          <p className="lead mb-4">
            Join thousands of organizations already using Fintradify solutions.
          </p>
          <a href="/login" className="btn btn-primary btn-lg px-5">
            Get Started Today
          </a>
        </div>
      </section>

      <style jsx>{`
        .card {
          transition: 0.3s;
          border-radius: 16px;
        }

        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 25px rgba(0, 123, 255, 0.15);
        }

        .icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.1), rgba(13, 110, 253, 0.05));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

export default SolutionsPage;
