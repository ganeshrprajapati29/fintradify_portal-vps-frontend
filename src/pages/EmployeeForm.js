import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Alert, Table, Card } from "react-bootstrap";
import "./EmployeeForm.css";
import {
  FaBug,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaClock,
  FaList,
  FaUserEdit,
  FaCommentDots,
} from "react-icons/fa";

const EmployeeForm = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [myMessages, setMyMessages] = useState([]);

  // ✅ Send Message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://steelblue-sheep-699352.hostingersite.com/api/messages",
        {
          employeeName,
          message,
        }
      );
      setInfo("✅ Message sent successfully!");
      setMessage("");
      fetchMyMessages();
      
      // Clear success message after 3 seconds
      setTimeout(() => setInfo(""), 3000);
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setInfo("❌ Error sending message");
      
      // Clear error message after 5 seconds
      setTimeout(() => setInfo(""), 5000);
    }
  };

  // ✅ Fetch Employee Messages
  const fetchMyMessages = async () => {
    try {
      if (employeeName) {
        const res = await axios.get(
          "https://steelblue-sheep-699352.hostingersite.com/api/messages/all"
        );
        const allMsgs = res.data.data || [];

        const myMsgs = allMsgs.filter(
          (m) => m.employeeName.toLowerCase() === employeeName.toLowerCase()
        );

        setMyMessages(myMsgs);
      }
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
      setInfo("❌ Failed to fetch messages");
      
      // Clear error message after 5 seconds
      setTimeout(() => setInfo(""), 5000);
    }
  };

  useEffect(() => {
    if (employeeName) fetchMyMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeName]);

  return (
    <Container className="mt-4 employee-form">
      {/* Page Header */}
      <div className="page-header mb-4">
        <h2>
          <FaBug /> Employee Issue Report
        </h2>
        <p className="card-subtitle">
          Report any issues or concerns you're facing
        </p>
      </div>

      {/* Alert Message */}
      {info && (
        <Alert
          variant={info.includes("Error") || info.includes("Failed") ? "danger" : "success"}
          className="d-flex align-items-center gap-2"
          dismissible
          onClose={() => setInfo("")}
        >
          {info.includes("Error") || info.includes("Failed") ? (
            <FaExclamationCircle />
          ) : (
            <FaCheckCircle />
          )}
          <span>{info}</span>
        </Alert>
      )}

      {/* Issue Report Form */}
      <Card className="shadow-sm mb-4">
        <Card.Header>
          <FaCommentDots /> Submit New Issue
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="required">
                <FaUserEdit /> Your Name
              </Form.Label>
              <Form.Control
                type="text"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
              <Form.Text className="text-muted">
                Enter your full name to track your issues
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="required">
                <FaBug /> Issue Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Describe your issue in detail..."
              />
              <Form.Text className="text-muted">
                Please provide as much detail as possible to help us resolve your issue quickly
              </Form.Text>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                type="reset"
                onClick={() => {
                  setMessage("");
                  setEmployeeName("");
                }}
              >
                Clear Form
              </Button>
              <Button variant="primary" type="submit">
                <FaPaperPlane /> Send Issue Report
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* My Issues List */}
      {employeeName && (
        <Card className="shadow-sm">
          <Card.Header>
            <FaList /> My Submitted Issues
          </Card.Header>
          <Card.Body>
            {myMessages.length === 0 ? (
              <div className="text-center py-5">
                <FaBug
                  style={{
                    fontSize: "3rem",
                    color: "var(--gray-light)",
                    marginBottom: "16px",
                  }}
                />
                <p className="text-muted">No issues submitted yet.</p>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Submit your first issue using the form above
                </p>
              </div>
            ) : (
              <div className="table-container">
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead>
                      <tr>
                        <th style={{ width: "50%" }}>
                          <FaCommentDots className="me-2" />
                          Issue Description
                        </th>
                        <th className="text-center" style={{ width: "20%" }}>
                          Status
                        </th>
                        <th className="text-center" style={{ width: "30%" }}>
                          <FaClock className="me-2" />
                          Submitted At
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {myMessages.map((msg) => (
                        <tr key={msg._id}>
                          <td>{msg.message}</td>
                          <td className="text-center">
                            <span
                              className={`status-badge ${msg.status
                                .replace(" ", "-")
                                .toLowerCase()}`}
                            >
                              {msg.status === "pending" && <FaClock className="me-1" />}
                              {msg.status === "in-progress" && <FaClock className="me-1" />}
                              {msg.status === "resolved" && <FaCheckCircle className="me-1" />}
                              {msg.status === "rejected" && <FaExclamationCircle className="me-1" />}
                              {msg.status}
                            </span>
                          </td>
                          <td className="text-center">
                            {new Date(msg.createdAt).toLocaleString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                
                {/* Issues Summary */}
                <div className="mt-3 p-3 bg-light rounded">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-semibold">Total Issues:</span>
                    <span className="badge badge-secondary">{myMessages.length}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-semibold">Pending:</span>
                    <span className="badge badge-warning">
                      {myMessages.filter((m) => m.status === "pending").length}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-semibold">Resolved:</span>
                    <span className="badge badge-success">
                      {myMessages.filter((m) => m.status === "resolved").length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default EmployeeForm;