import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Page Title (No Background) */}
      <section className="py-5">
        <div className="container text-center">
          <h1 className="display-5 fw-bold mb-2">
            <i className="bi bi-shield-lock-fill me-2"></i>
            Privacy Policy
          </h1>
          <p className="text-muted">
            Your privacy and data security are important to us
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-4 policy-page">
        <div className="container">

          {/* Meta */}
          <div className="row mb-4">
            <div className="col">
              <p className="text-muted">
                <i className="bi bi-clock-history me-1"></i>
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* ===== INTRODUCTION ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-info-circle me-2"></i>
                Introduction
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <p>
                Fintradify ("we", "our", "us") respects your privacy and is committed
                to protecting your personal information. This Privacy Policy
                explains how we collect, use, and safeguard your data.
              </p>
            </div>
          </div>

          {/* ===== DATA COLLECTION ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-person-lines-fill me-2"></i>
                Information We Collect
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <ul>
                <li>Name, email address, and contact details</li>
                <li>Employee and payroll records</li>
                <li>Attendance, leave, and performance data</li>
                <li>Uploaded documents and profile images</li>
                <li>Technical data such as IP address and browser details</li>
              </ul>
            </div>
          </div>

          {/* ===== DATA USAGE ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-gear-fill me-2"></i>
                How We Use Information
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <ul>
                <li>Providing HR management services</li>
                <li>Payroll, attendance, and leave processing</li>
                <li>User communication and support</li>
                <li>Platform improvement and security</li>
                <li>Legal and regulatory compliance</li>
              </ul>
            </div>
          </div>

          {/* ===== SHARING ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-share-fill me-2"></i>
                Information Sharing
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <p>
                We do not sell your personal information. Data may be shared only
                with trusted partners or legal authorities when required.
              </p>
            </div>
          </div>

          {/* ===== SECURITY ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-lock-fill me-2"></i>
                Data Security
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <p>
                We apply industry-standard security measures including encryption
                and access control to protect your data.
              </p>
            </div>
          </div>

          {/* ===== RIGHTS ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-person-check-fill me-2"></i>
                Your Rights
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            <div className="col">
              <ul>
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of data</li>
                <li>Object to data processing</li>
              </ul>
            </div>
          </div>

          {/* ===== CONTACT ===== */}
          <div className="row">
            <div className="col">
              <h5 className="policy-heading">
                <i className="bi bi-envelope-fill me-2"></i>
                Contact Us
              </h5>
            </div>
          </div>
          <hr />
          <div className="row mb-5">
            <div className="col">
              <p><i className="bi bi-envelope me-2"></i>support@fintradify.com</p>
              <p><i className="bi bi-telephone me-2"></i>+91 78360 09907</p>
              <p><i className="bi bi-geo-alt me-2"></i>India</p>
            </div>
          </div>

        </div>
      </section>

      {/* Styles */}
      <style jsx>{`
        .policy-page {
          font-family: 'Inter', sans-serif;
          line-height: 1.7;
        }

        .policy-heading {
          font-weight: 600;
          color: #0d6efd;
        }

        hr {
          border-top: 1px solid #e9ecef;
          margin: 0.5rem 0 1.5rem;
        }

        ul {
          padding-left: 1.2rem;
        }

        li {
          margin-bottom: 0.4rem;
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicy;
