import React, { useState, useEffect } from "react";
import { FaBell, FaCheck } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";

const EmployeeNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        setError("User not found");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(`/api/notifications/${user.id}`);
      if (response.data.success) {
        setNotifications(response.data.data);
      } else {
        setError(response.data.msg);
      }
    } catch (err) {
      setError("Failed to fetch notifications");
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const response = await axiosInstance.put(`/api/notifications/read/${notificationId}`);
      if (response.data.success) {
        setNotifications(notifications.map(notif =>
          notif._id === notificationId ? { ...notif, isRead: true } : notif
        ));
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-header bg-info text-white text-center">
          <FaBell className="me-2" />
          Employee Notifications
        </div>
        <div className="card-body">
          {notifications.length === 0 ? (
            <p className="text-muted text-center">No notifications available.</p>
          ) : (
            <div className="list-group">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`list-group-item list-group-item-action ${
                    !notification.isRead ? "bg-light" : ""
                  }`}
                >
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{notification.subject}</h5>
                    <small className="text-muted">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  <p className="mb-1">{notification.message}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      From: {notification.senderName}
                    </small>
                    {!notification.isRead && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => markAsRead(notification._id)}
                      >
                        <FaCheck className="me-1" />
                        Mark as Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeNotifications;
