import React from "react";

const PrivacyPolicy = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container text-center">
          <h1 className="display-4 fw-bold mb-4">Privacy Policy</h1>
          <p className="lead mb-0">
            Your privacy and data security are our top priorities
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="content-wrapper">
                <p className="text-muted mb-4">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <h2 className="fw-bold text-primary mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Welcome to Fintradify ("we," "our," or "us"). We are committed to protecting your privacy
                  and ensuring the security of your personal information. This Privacy Policy explains how
                  we collect, use, disclose, and safeguard your information when you use our HR management
                  platform and services.
                </p>

                <h2 className="fw-bold text-primary mb-4">2. Information We Collect</h2>

                <h5 className="fw-bold mb-3">2.1 Personal Information</h5>
                <p className="mb-3">We may collect the following types of personal information:</p>
                <ul className="mb-4">
                  <li>Name, email address, and contact information</li>
                  <li>Employment details (position, department, salary)</li>
                  <li>Attendance and leave records</li>
                  <li>Performance and task-related data</li>
                  <li>Profile pictures and other uploaded documents</li>
                </ul>

                <h5 className="fw-bold mb-3">2.2 Usage Information</h5>
                <p className="mb-4">
                  We automatically collect certain information about your use of our services,
                  including IP addresses, browser type, operating system, and usage patterns.
                </p>

                <h2 className="fw-bold text-primary mb-4">3. How We Use Your Information</h2>
                <p className="mb-3">We use the collected information for the following purposes:</p>
                <ul className="mb-4">
                  <li>Providing and maintaining our HR management services</li>
                  <li>Processing attendance, leave, and payroll information</li>
                  <li>Communicating with you about your account and our services</li>
                  <li>Improving our platform and developing new features</li>
                  <li>Ensuring security and preventing fraud</li>
                  <li>Complying with legal obligations</li>
                </ul>

                <h2 className="fw-bold text-primary mb-4">4. Information Sharing and Disclosure</h2>
                <p className="mb-3">We do not sell, trade, or otherwise transfer your personal information to third parties, except in the following circumstances:</p>
                <ul className="mb-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>With trusted service providers who assist in operating our platform (under strict confidentiality agreements)</li>
                </ul>

                <h2 className="fw-bold text-primary mb-4">5. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction. This
                  includes encryption, secure servers, and regular security audits.
                </p>

                <h2 className="fw-bold text-primary mb-4">6. Data Retention</h2>
                <p className="mb-4">
                  We retain your personal information only as long as necessary for the purposes outlined
                  in this Privacy Policy, unless a longer retention period is required by law. When we
                  no longer need your information, we will securely delete or anonymize it.
                </p>

                <h2 className="fw-bold text-primary mb-4">7. Your Rights</h2>
                <p className="mb-3">You have the following rights regarding your personal information:</p>
                <ul className="mb-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Restriction:</strong> Request restriction of processing in certain circumstances</li>
                </ul>

                <h2 className="fw-bold text-primary mb-4">8. Cookies and Tracking</h2>
                <p className="mb-4">
                  We use cookies and similar technologies to enhance your experience on our platform.
                  You can control cookie settings through your browser preferences. However, disabling
                  cookies may affect the functionality of our services.
                </p>

                <h2 className="fw-bold text-primary mb-4">9. Third-Party Services</h2>
                <p className="mb-4">
                  Our platform may contain links to third-party websites or services. We are not
                  responsible for the privacy practices of these third parties. We encourage you
                  to review their privacy policies before providing any personal information.
                </p>

                <h2 className="fw-bold text-primary mb-4">10. Children's Privacy</h2>
                <p className="mb-4">
                  Our services are not intended for children under 13 years of age. We do not
                  knowingly collect personal information from children under 13. If we become
                  aware that we have collected such information, we will take steps to delete it.
                </p>

                <h2 className="fw-bold text-primary mb-4">11. International Data Transfers</h2>
                <p className="mb-4">
                  Your information may be transferred to and processed in countries other than
                  your own. We ensure that such transfers comply with applicable data protection laws.
                </p>

                <h2 className="fw-bold text-primary mb-4">12. Changes to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any
                  material changes by posting the new policy on this page and updating the "Last
                  updated" date. Your continued use of our services after such changes constitutes
                  acceptance of the updated policy.
                </p>

                <h2 className="fw-bold text-primary mb-4">13. Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy or our data practices,
                  please contact us at:
                </p>
                <div className="contact-info mb-4">
                  <p><strong>Email:</strong> privacy@fintradify.com</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> 123 Business District, Tech City, TC 12345, India</p>
                </div>

                <div className="alert alert-info">
                  <strong>Note:</strong> This privacy policy is effective as of the date shown above.
                  By using Fintradify, you acknowledge that you have read and understood this policy.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .content-wrapper {
          background: #ffffff;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        h2 {
          color: #0d6efd;
          border-bottom: 2px solid #e9ecef;
          padding-bottom: 0.5rem;
        }

        h5 {
          color: #495057;
        }

        ul {
          padding-left: 1.5rem;
        }

        li {
          margin-bottom: 0.5rem;
        }

        .contact-info {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 8px;
          border-left: 4px solid #0d6efd;
        }

        .alert {
          background: #d1ecf1;
          border: 1px solid #bee5eb;
          color: #0c5460;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
};

export default PrivacyPolicy;
