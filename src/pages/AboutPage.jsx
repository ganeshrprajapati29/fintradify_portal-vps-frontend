import React from "react";
import { FaUsers, FaShieldAlt, FaRocket, FaHeart, FaCheckCircle } from "react-icons/fa";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">About Fintradify</h1>
          <p className="lead mb-0">
            Revolutionizing HR management with innovative technology and user-centric design
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary mb-4">Our Mission</h2>
              <p className="text-muted mb-4">
                At Fintradify, we believe that managing human resources should be simple,
                efficient, and accessible to organizations of all sizes. Our mission is to
                empower businesses with cutting-edge HR technology that streamlines operations,
                enhances employee experience, and drives organizational success.
              </p>
              <ul className="list-unstyled">
                <li className="mb-3 d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3" size={20} />
                  <span className="fw-semibold">Simplify HR processes for everyone</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3" size={20} />
                  <span className="fw-semibold">Provide free, comprehensive HR solutions</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3" size={20} />
                  <span className="fw-semibold">Ensure data security and privacy</span>
                </li>
                <li className="mb-3 d-flex align-items-center">
                  <FaCheckCircle className="text-success me-3" size={20} />
                  <span className="fw-semibold">Support business growth and innovation</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-6 text-center">
              <img
                src="https://img.freepik.com/free-vector/team-spirit-concept-illustration_114360-688.jpg"
                alt="Our Mission"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <h2 className="fw-bold text-primary mb-3">Our Core Values</h2>
              <p className="text-muted lead">
                The principles that guide everything we do
              </p>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="icon mb-3">
                  <FaUsers className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">People First</h5>
                <p className="text-muted">
                  We prioritize the needs of employees and organizations,
                  creating solutions that truly make a difference.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="icon mb-3">
                  <FaShieldAlt className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Security & Trust</h5>
                <p className="text-muted">
                  Your data is protected with enterprise-grade security,
                  ensuring complete privacy and compliance.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="icon mb-3">
                  <FaRocket className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Innovation</h5>
                <p className="text-muted">
                  We continuously evolve our platform with the latest
                  technology to meet changing business needs.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm border-0 text-center p-4">
                <div className="icon mb-3">
                  <FaHeart className="text-primary" size={40} />
                </div>
                <h5 className="fw-bold mb-3">Passion</h5>
                <p className="text-muted">
                  We're passionate about HR excellence and committed
                  to helping organizations thrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center mb-4 mb-lg-0">
              <img
                src="https://img.freepik.com/free-vector/business-team-discussing-ideas-startup_74855-4380.jpg"
                alt="Our Story"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="fw-bold text-primary mb-4">Our Story</h2>
              <p className="text-muted mb-4">
                Founded with the vision to democratize HR technology, Fintradify was born
                from the realization that many organizations struggle with complex, expensive
                HR systems. We set out to create a solution that's not only powerful but
                also completely free and easy to use.
              </p>
              <p className="text-muted mb-4">
                Today, thousands of organizations worldwide trust Fintradify to manage their
                workforce efficiently. From startups to enterprises, our platform adapts to
                businesses of all sizes, providing the tools they need to focus on what
                matters most - their people.
              </p>
              <p className="text-muted">
                Join us in our mission to transform HR management for the better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Join thousands of organizations already using Fintradify to streamline their HR processes.
          </p>
          <a href="/login" className="btn btn-light btn-lg px-5">
            Start Free Today
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
          box-shadow: 0px 8px 20px rgba(0, 123, 255, 0.15);
        }

        .icon {
          color: #0d6efd;
        }
      `}</style>
    </>
  );
};

export default AboutPage;
