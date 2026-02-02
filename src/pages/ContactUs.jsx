import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Replace with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          topic: formData.topic,
          message: formData.message,
          subject: `New Contact Form Submission - ${formData.topic}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", topic: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      {/* Custom SVG Background */}
      <div className="svg-background">
        <svg
          viewBox="0 0 1440 320"
          className="top-wave"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4f46e5"
            fillOpacity="0.1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="container position-relative">
        {/* Section Header */}
        <div className="text-center mb-5 header-animation">
          <h2 className="display-4 fw-bold gradient-text mb-3">Get In Touch</h2>
          <p className="lead text-muted">
            Have questions about our HR Portal? We'd love to hear from you.
          </p>
          <div className="header-underline"></div>
        </div>

        <div className="row g-4">
          {/* Left Side - Contact Info Cards */}
          <div className="col-lg-5">
            <div className="contact-info-wrapper">
              {/* Main Contact Card */}
              <div className="contact-card glass-effect mb-4">
                <div className="card-icon-wrapper">
                  <div className="icon-circle pulse-animation">
                    <FaEnvelope className="contact-icon" />
                  </div>
                </div>
                <h4 className="mb-3 fw-bold">Get in Touch</h4>
                
                <div className="contact-item">
                  <div className="item-icon email-icon">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="item-label">Email</p>
                    <p className="item-value">support@fintradify.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="item-icon phone-icon">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="item-label">Phone</p>
                    <p className="item-value">+91 7836009907</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="item-icon location-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="item-label">Location</p>
                    <p className="item-value"> C6,  Sector 7 ,Noida, UP 201301, India</p>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="info-card glass-effect">
                <div className="decorative-circle circle-1"></div>
                <div className="decorative-circle circle-2"></div>
                <h5 className="fw-bold mb-3">Why Contact Us?</h5>
                <p className="mb-0">
                  We're here to help you streamline your HR processes and provide
                  complete support for your team. Get answers to your questions
                  within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="col-lg-7">
            <div className="form-card glass-effect">
              <div className="form-header">
                <h4 className="fw-bold mb-2">Send us a Message</h4>
                <p className="text-muted">Fill out the form below and we'll get back to you</p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Name Input */}
                <div className="mb-4 form-group-custom">
                  <label className="form-label fw-semibold">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4 form-group-custom">
                  <label className="form-label fw-semibold">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control custom-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Topic Dropdown */}
                <div className="mb-4 form-group-custom">
                  <label className="form-label fw-semibold">Select Topic</label>
                  <select
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className="form-select custom-input"
                    required
                  >
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    <option value="Attendance">Attendance</option>
                    <option value="Leave Management">Leave Management</option>
                    <option value="Employee Dashboard">Employee Dashboard</option>
                    <option value="Analytics & Reports">Analytics & Reports</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="mb-4 form-group-custom">
                  <label className="form-label fw-semibold">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control custom-input"
                    rows="5"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-submit w-100"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="me-2" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="alert alert-success mt-3 slide-in">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="alert alert-danger mt-3 slide-in">
                    ❌ Failed to send message. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave SVG */}
      <div className="svg-background-bottom">
        <svg
          viewBox="0 0 1440 320"
          className="bottom-wave"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#4f46e5"
            fillOpacity="0.05"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,154.7C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <style jsx>{`
        .contact-section {
          padding: 80px 0;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .svg-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 0;
        }

        .svg-background-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 0;
        }

        .top-wave,
        .bottom-wave {
          display: block;
          width: 100%;
        }

        .container {
          position: relative;
          z-index: 1;
        }

        /* Header Styles */
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-underline {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
          margin: 20px auto;
          border-radius: 2px;
        }

        .header-animation {
          animation: fadeInDown 0.8s ease-out;
        }

        /* Glass Effect */
        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-effect:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        /* Contact Card */
        .contact-card {
          padding: 40px;
          position: relative;
        }

        .card-icon-wrapper {
          text-align: center;
          margin-bottom: 30px;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .contact-icon {
          font-size: 32px;
          color: white;
        }

        .pulse-animation {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }
          50% {
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.6);
          }
          100% {
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
          }
        }

        /* Contact Items */
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          background: rgba(102, 126, 234, 0.05);
          transform: translateX(5px);
        }

        .item-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 15px;
          font-size: 20px;
          color: white;
        }

        .email-icon {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .phone-icon {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }

        .location-icon {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }

        .item-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 2px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .item-value {
          font-size: 16px;
          color: #1f2937;
          margin: 0;
          font-weight: 600;
        }

        /* Info Card */
        .info-card {
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .decorative-circle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.1;
        }

        .circle-1 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          top: -50px;
          right: -50px;
        }

        .circle-2 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          bottom: -30px;
          left: -30px;
        }

        /* Form Card */
        .form-card {
          padding: 40px;
        }

        .form-header {
          margin-bottom: 30px;
        }

        /* Custom Input Styles */
        .custom-input {
          padding: 14px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          background: #ffffff;
        }

        .custom-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          outline: none;
        }

        .form-group-custom {
          position: relative;
        }

        .form-label {
          color: #374151;
          margin-bottom: 8px;
          font-size: 14px;
        }

        /* Submit Button */
        .btn-submit {
          padding: 16px 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 16px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
          background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .slide-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 992px) {
          .contact-section {
            padding: 60px 0;
          }

          .contact-card,
          .form-card {
            padding: 30px;
          }
        }

        @media (max-width: 768px) {
          .gradient-text {
            font-size: 2rem;
          }

          .contact-card,
          .form-card {
            padding: 25px;
          }

          .icon-circle {
            width: 60px;
            height: 60px;
          }

          .contact-icon {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default ContactUs;