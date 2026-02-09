import React from "react";
import {
  FaUsers,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaTasks,
  FaEnvelope,
  FaChartLine,
  FaCheckCircle
} from "react-icons/fa";

const SolutionsPage = () => {
  return (
    <>
      {/* HERO */}

      <section className="hero-section text-white text-center d-flex align-items-center">
        <div className="container">
          <h1 className="fw-bold display-5 mb-3">
            Smart HR Solutions for Growing Businesses
          </h1>
          <p className="lead mb-0">
            Automate HR operations and boost workforce productivity
          </p>
        </div>
      </section>


      {/* SOLUTIONS */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-primary">Our HR Solutions</h2>
            <p className="text-muted">
              Everything you need to manage people, payroll & performance
            </p>
          </div>

          <div className="row g-4">

            {/* Employee Management */}
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 solution-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaUsers size={36} />
                  </div>
                  <h5 className="fw-bold">Employee Management</h5>
                  <p className="text-muted small">
                    Complete employee lifecycle management with automation.
                  </p>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Digital onboarding
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Employee profiles
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Document storage
                  </span>
                </div>
              </div>
            </div>

            {/* Attendance */}
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 solution-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaCalendarAlt size={36} />
                  </div>
                  <h5 className="fw-bold">Attendance & Leave</h5>
                  <p className="text-muted small">
                    Smart attendance tracking and leave management.
                  </p>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Biometric support
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Leave approvals
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Shift scheduling
                  </span>
                </div>
              </div>
            </div>

            {/* Payroll */}
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 solution-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaFileInvoiceDollar size={36} />
                  </div>
                  <h5 className="fw-bold">Payroll Processing</h5>
                  <p className="text-muted small">
                    Automated payroll with tax compliance.
                  </p>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Salary slips
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Tax calculation
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Bank transfer
                  </span>
                </div>
              </div>
            </div>

            {/* Task */}
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 solution-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaTasks size={36} />
                  </div>
                  <h5 className="fw-bold">Task Management</h5>
                  <p className="text-muted small">
                    Assign, track & manage tasks efficiently.
                  </p>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Task assignment
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Deadline tracking
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Performance metrics
                  </span>
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 solution-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaEnvelope size={36} />
                  </div>
                  <h5 className="fw-bold">Communication Hub</h5>
                  <p className="text-muted small">
                    Centralized internal communication system.
                  </p>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Internal chat
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Announcements
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Notifications
                  </span>
                </div>
              </div>
            </div>

            {/* Analytics */}
            <div className="col-md-6 col-xl-4">
              <div className="card h-100 solution-card border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="icon-box mb-3">
                    <FaChartLine size={36} />
                  </div>
                  <h5 className="fw-bold">Analytics & Reports</h5>
                  <p className="text-muted small">
                    Real-time insights and customizable reports.
                  </p>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Attendance reports
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Productivity metrics
                  </span>
                  <span className="badge bg-light border text-dark me-1">
                    <FaCheckCircle className="text-success me-1" size={12} />
                    Custom dashboards
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="fw-bold text-primary mb-3">
            Ready to Transform Your HR?
          </h2>
          <p className="lead text-muted mb-4">
            Start your HR automation journey today
          </p>
          <a href="/login" className="btn btn-primary btn-lg px-5">
            Get Started
          </a>
        </div>
      </section>

      {/* STYLES */}
      <style jsx>{`

.hero-section {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
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
  transform: scale(1.05); /* blur edges fix */
  z-index: 1;
}

/* Text content above blur */
.hero-section .container {
  position: relative;
  z-index: 2;
}

.hero-section h1,
.hero-section p {
 color: #f7f9fc;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
  
}
         

  
        .solution-card { 
          border-radius: 18px;
          transition: 0.3s;
        }

        .solution-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(13, 110, 253, 0.2);
        }

        .icon-box {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(
            135deg,
            rgba(13, 110, 253, 0.15),
            rgba(13, 110, 253, 0.05)
          );
          color: #0d6efd;
        }
      `}</style>
    </>
  );
};

export default SolutionsPage;
