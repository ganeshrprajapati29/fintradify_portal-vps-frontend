import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaSearch, FaEnvelope } from "react-icons/fa";

const SuperAdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL || "https://steelblue-sheep-699352.hostingersite.com";

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/superadmin/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error("❌ Fetch Messages Error:", err);
      alert("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      await axios.delete(`${API_URL}/api/superadmin/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(messages.filter((msg) => msg._id !== id));
      alert("Message deleted successfully");
    } catch (err) {
      console.error("❌ Delete Message Error:", err);
      alert("Failed to delete message");
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.subject?.toLowerCase().includes(search.toLowerCase()) ||
      msg.message?.toLowerCase().includes(search.toLowerCase()) ||
      msg.senderId?.username?.toLowerCase().includes(search.toLowerCase()) ||
      msg.receiverId?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="superadmin-content">
      <div className="dashboard-header">
        <h2>
          <FaEnvelope /> Messages Management
        </h2>
        <p>View and manage all messages in the system</p>
      </div>

      <div className="search-section">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      <div className="table-section">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : filteredMessages.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMessages.map((msg) => (
                  <tr key={msg._id}>
                    <td>{msg.senderId?.username || "Unknown"}</td>
                    <td>{msg.receiverId?.username || "Unknown"}</td>
                    <td>{msg.subject || "No Subject"}</td>
                    <td>{msg.message?.substring(0, 50)}...</td>
                    <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteMessage(msg._id)}
                        title="Delete Message"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>No messages found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminMessages;
