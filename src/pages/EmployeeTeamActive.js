import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUsers, FaClock, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const EmployeeTeamActive = () => {
  const [teamActivities, setTeamActivities] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL =
    (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
    "https://steelblue-sheep-699352.hostingersite.com";
  const token = localStorage.getItem("token");

  // Fetch team activities
  useEffect(() => {
    fetchTeamActive();
  }, []);

  const fetchTeamActive = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/employee/team-active`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeamActivities(res.data.teamActivities || []);
      setTeamMembers(res.data.teamMembers || []);
    } catch (err) {
      console.error("❌ Fetch team active error:", err);
      setError("Failed to fetch team activities");
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case "Login":
        return <FaUser className="text-success" />;
      case "Task Update":
        return <FaClock className="text-info" />;
      case "Attendance":
        return <FaMapMarkerAlt className="text-primary" />;
      default:
        return <FaClock className="text-secondary" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>
              <FaUsers className="me-2" />
              Team Activity
            </h2>
            <button
              className="btn btn-primary"
              onClick={fetchTeamActive}
              disabled={loading}
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Team Members Overview */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>
                <FaUsers className="me-2" />
                Team Members ({teamMembers.length})
              </h5>
            </div>
            <div className="card-body">
              {teamMembers.length === 0 ? (
                <p className="text-muted">No team members found.</p>
              ) : (
                <div className="row">
                  {teamMembers.map((member) => (
                    <div key={member._id} className="col-md-4 col-sm-6 mb-3">
                      <div className="card h-100">
                        <div className="card-body text-center">
                          <FaUser size={32} className="text-primary mb-2" />
                          <h6 className="card-title">{member.name}</h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card">
            <div className="card-header">
              <h5>
                <FaClock className="me-2" />
                Recent Team Activities
              </h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : teamActivities.length === 0 ? (
                <div className="text-center py-5">
                  <FaUsers size={48} className="text-muted mb-3" />
                  <p className="text-muted">No recent team activities found.</p>
                </div>
              ) : (
                <div className="timeline">
                  {teamActivities.map((activity, index) => (
                    <div key={activity._id} className="timeline-item">
                      <div className="timeline-marker">
                        {getActivityIcon(activity.activityType)}
                      </div>
                      <div className="timeline-content">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">
                              {activity.employeeId?.name || "Unknown User"}
                            </h6>
                            <p className="mb-1 text-muted">{activity.description}</p>
                            <small className="text-muted">
                              {activity.activityType} • {formatTimestamp(activity.timestamp)}
                            </small>
                          </div>
                          {activity.location && (
                            <div className="text-end">
                              <small className="text-muted">
                                <FaMapMarkerAlt className="me-1" />
                                {activity.location.latitude?.toFixed(4)}, {activity.location.longitude?.toFixed(4)}
                              </small>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .timeline {
          position: relative;
          padding-left: 30px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #e9ecef;
        }

        .timeline-item {
          position: relative;
          margin-bottom: 20px;
        }

        .timeline-marker {
          position: absolute;
          left: -22px;
          top: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: white;
          border: 2px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-content {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 3px solid #007bff;
        }
      `}</style>
    </div>
  );
};

export default EmployeeTeamActive;
