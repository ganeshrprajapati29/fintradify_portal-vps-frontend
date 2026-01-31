import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserClock, FaFileAlt, FaUsers, FaChartLine,
  FaUserCheck, FaCalendarCheck, FaShieldAlt, FaChartBar, FaGlobe, FaCheckCircle,
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowRight
} from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section-landing">
        <div className="container-fluid">
          <div className="row align-items-center min-vh-100">
            {/* LEFT: HEADING */}
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-4 fw-bold text-primary mb-4">
                Fintradify - Complete HR Management Solution
              </h1>
              <p className="lead text-muted mb-4">
                Streamline your workforce management with our comprehensive HR portal.
                Track attendance, manage leaves, handle tasks, and boost productivity all in one place.
              </p>
              <div className="d-flex justify-content-center justify-content-lg-start gap-3 mb-4">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate('/login')}
                >
                  Get Started Free <FaArrowRight className="ms-2" />
                </button>
                <button
                  className="btn btn-outline-primary btn-lg"
                  onClick={() => scrollToSection('features')}
                >
                  Explore Features
                </button>
              </div>
              <div className="d-flex justify-content-center justify-content-lg-start gap-4 fs-4 social-icons">
                <a href="#" className="text-primary"><FaFacebookF /></a>
                <a href="#" className="text-primary"><FaTwitter /></a>
                <a href="#" className="text-primary"><FaLinkedinIn /></a>
                <a href="#" className="text-primary"><FaInstagram /></a>
              </div>
            </div>

            {/* RIGHT: HERO IMAGE/ILLUSTRATION */}
            <div className="col-lg-6 text-center">
              <div className="hero-image-container">
                <img
                  src="https://img.freepik.com/free-vector/team-management-concept-illustration_114360-11479.jpg"
                  alt="HR Management Illustration"
                  className="img-fluid hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold text-primary mb-3">Powerful Features for Modern HR Management</h2>
              <p className="text-muted lead">
                Everything you need to manage your workforce effectively,
                all completely free of charge.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4 feature-card">
                <div className="icon mb-3">
                  <FaUserClock className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Attendance Tracking</h5>
                <p className="text-muted">
                  Monitor daily check-ins, leaves, and working hours in real time,
                  making attendance management effortless and transparent.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4 feature-card">
                <div className="icon mb-3">
                  <FaFileAlt className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Digital Records</h5>
                <p className="text-muted">
                  Store and access employee documents, contracts, and policies
                  securely in one place without the hassle of paperwork.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4 feature-card">
                <div className="icon mb-3">
                  <FaUsers className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Employee Engagement</h5>
                <p className="text-muted">
                  Boost communication, feedback, and collaboration across teams
                  with features designed to keep employees engaged.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4 feature-card">
                <div className="icon mb-3">
                  <FaChartLine className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Performance Insights</h5>
                <p className="text-muted">
                  Get analytics and reports on employee performance to help
                  managers make informed decisions and drive growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary mb-4">Why Choose Our HR Portal?</h2>
              <p className="text-muted mb-4">
                Our HR portal is designed to simplify workforce management, improve employee
                engagement, and provide managers with real-time insights. With a modern
                interface and secure features, it ensures that your organization runs smoothly
                and efficiently.
              </p>

              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <FaCalendarCheck className="text-success me-3" size={20} />
                  <span className="fw-semibold">Real-time Attendance & Leave Tracking</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaUserCheck className="text-primary me-3" size={20} />
                  <span className="fw-semibold">Easy Employee Self-Service</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaShieldAlt className="text-danger me-3" size={20} />
                  <span className="fw-semibold">Secure Data Management</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaChartBar className="text-warning me-3" size={20} />
                  <span className="fw-semibold">Insightful Analytics & Reports</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaGlobe className="text-info me-3" size={20} />
                  <span className="fw-semibold">24/7 Access from Anywhere</span>
                </li>
              </ul>

              <button
                className="btn btn-primary btn-lg mt-3"
                onClick={() => navigate('/login')}
              >
                Start Using Free Today
              </button>
            </div>

            <div className="col-lg-6 text-center mt-5 mt-lg-0">
              <img
                src="https://img.freepik.com/free-vector/office-workers-analyzing-data-charts_1262-19783.jpg"
                alt="HR Portal Features"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Free Plan Section */}
      <section id="pricing" className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4 text-primary fw-bold">Completely Free HR Portal</h2>
          <p className="mb-5 text-muted lead">
            No subscriptions, no hidden fees, no limitations.
            Get full access to all features forever.
          </p>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-lg border-0 free-plan-card">
                <div className="card-body p-5">
                  <div className="free-badge mb-3">
                    <span className="badge bg-success fs-6 px-3 py-2">100% FREE</span>
                  </div>
                  <h3 className="card-title mb-4 text-primary fw-bold">All Features Included</h3>
                  <div className="price mb-4">
                    <span className="display-4 fw-bold text-success">₹0</span>
                    <span className="text-muted">/ forever</span>
                  </div>
                  <ul className="list-unstyled text-start mb-4">
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Complete Attendance Tracking</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Leave Management System</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Employee Self-Service Portal</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Secure Data Management</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Advanced Analytics & Reports</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Task Management</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">Messaging System</span>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                      <FaCheckCircle className="text-success me-3" size={20} />
                      <span className="fw-semibold">24/7 Support</span>
                    </li>
                  </ul>
                  <button
                    className="btn btn-primary btn-lg w-100"
                    onClick={() => navigate('/login')}
                  >
                    Get Started Now - It's Free!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Ready to Transform Your HR Management?</h2>
          <p className="lead mb-4">
            Join thousands of organizations already using our free HR portal to streamline their workforce management.
          </p>
          <button
            className="btn btn-light btn-lg px-5"
            onClick={() => navigate('/login')}
          >
            Start Free Today <FaArrowRight className="ms-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer text-white pt-5 pb-3 mt-5">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-4 mb-4">
                <h3 className="fw-bold">Fintradify</h3>
                <p className="text-muted">
                  Simplifying workforce management with attendance tracking,
                  performance insights, and digital records in one place.
                </p>
                <div className="mt-3">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.hr.fintradify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm"
                  >
                    Download Mobile App
                  </a>
                </div>
              </div>

              <div className="col-md-4 mb-4">
                <h5 className="fw-bold mb-3">Quick Links</h5>
                <ul className="list-unstyled">
                  <li><a href="#features" className="footer-link">Features</a></li>
                  <li><a href="#pricing" className="footer-link">Pricing</a></li>
                  <li><a href="/about" className="footer-link">About</a></li>
                  <li><a href="/contact" className="footer-link">Contact</a></li>
                  <li><a href="/HR/policies" className="footer-link">Privacy Policy</a></li>
                </ul>
              </div>

              <div className="col-md-4 mb-4">
                <h5 className="fw-bold mb-3">Get in Touch</h5>
                <p className="text-muted">Email: support@hrportal.com</p>
                <p className="text-muted">Phone: +91 98765 43210</p>
                <div className="d-flex gap-3 fs-4 mt-3">
                  <a href="#"><FaFacebookF /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaLinkedinIn /></a>
                  <a href="#"><FaInstagram /></a>
                </div>
              </div>
            </div>

            <hr className="border-light" />
            <p className="text-muted text-center m-0">© {new Date().getFullYear()} Fintradify. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .hero-section-landing {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          padding: 80px 0;
          position: relative;
        }

        .hero-section-landing::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('https://img.freepik.com/free-vector/white-background-with-blue-tech-hexagon_1017-19366.jpg') no-repeat center center;
          background-size: cover;
          opacity: 0.1;
        }

        .hero-section-landing .container-fluid {
          position: relative;
          z-index: 2;
        }

        .hero-image-container {
          position: relative;
        }

        .hero-image {
          max-width: 100%;
          height: auto;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 123, 255, 0.2);
        }

        .feature-card {
          transition: 0.3s;
          border-radius: 16px;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 8px 20px rgba(0, 123, 255, 0.15);
        }

        .free-plan-card {
          border-radius: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border: 2px solid #e9ecef;
        }

        .free-badge {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .footer {
          position: relative;
          background: #343a40;
        }

        .footer .overlay {
          background: rgba(0, 0, 0, 0.1);
          width: 100%;
          height: 100%;
          padding: 0;
        }

        .footer .footer-link {
          color: #adb5bd;
          text-decoration: none;
          transition: 0.3s;
        }

        .footer .footer-link:hover {
          color: #ffffff;
          padding-left: 5px;
        }

        .footer a {
          color: #adb5bd;
          transition: 0.3s;
        }

        .footer a:hover {
          color: #ffffff;
        }

        .social-icons a {
          color: #0d6efd;
          transition: 0.3s;
        }

        .social-icons a:hover {
          color: #0056b3;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default LandingPage;
