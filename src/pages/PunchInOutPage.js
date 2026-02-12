import React, { useEffect, useState } from "react";
import axios from "axios";
import PunchInOut from "../components/PunchInOut";
import "./EmployeeAttendance.css";

// ✅ Icons
import {
  FaClock,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaDownload,
  FaCalendarAlt,
  FaUser,
  FaFilter,
} from "react-icons/fa";

const PunchInOutPage = () => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");

  const API_URL =
    (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
    "https://steelblue-sheep-699352.hostingersite.com";

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/employee/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data?.attendance || []);
    } catch (err) {
      console.error("❌ Fetch Attendance error:", err.response?.data || err.message);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Filter attendance records based on search and date filters
  const filteredAttendance = attendance.filter((record) => {
    const matchesSearch = searchTerm === "" ||
      (record.userId?.name || userName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (record.userId?.email || userEmail || "").toLowerCase().includes(searchTerm.toLowerCase());

    const recordDate = new Date(record.punchIn || record.punchOut);
    const matchesDate = (!startDate || recordDate >= new Date(startDate)) &&
                       (!endDate || recordDate <= new Date(endDate + "T23:59:59"));

    return matchesSearch && matchesDate;
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredAttendance.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedAttendance = filteredAttendance.slice(startIndex, startIndex + recordsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleDateFilter = () => {
    setCurrentPage(1); // Reset to first page on filter
  };

  const calculateWorkingHours = (punchIn, punchOut) => {
    if (!punchIn || !punchOut) return "—";
    const diffMs = new Date(punchOut) - new Date(punchIn);
    if (diffMs <= 0) return "—";

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const renderLocation = (record, type) => {
    const address = type === 'in' ? record.punchInAddress : record.punchOutAddress;
    const location = type === 'in' ? record.punchInLocation : record.punchOutLocation;
    if (address && address !== 'N/A') return address;
    if (!location?.latitude || !location?.longitude) return "—";
    return (
      <a
        href={`https://maps.google.com/?q=${location.latitude},${location.longitude}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {location.latitude}, {location.longitude}
      </a>
    );
  };

  return (
    <div className="attendance-container">
      <h2 className="attendance-title">⏰ Punch In/Out Dashboard</h2>

      {/* Punch In/Out Section */}
      <PunchInOut />

      {/* Filters and Search */}
      <div className="filters-container row g-3 mb-4">
        <div className="col-md-4 col-sm-12">
          <label className="form-label fw-semibold">
            <FaSearch className="me-2" />
            Search by Name/Email
          </label>
          <input
            type="text"
            placeholder="e.g. John Doe or john@company.com"
            className="form-control"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-3 col-6">
          <label className="form-label fw-semibold">
            <FaCalendarAlt className="me-2" />
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-6">
          <label className="form-label fw-semibold">
            <FaCalendarAlt className="me-2" />
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-2 col-12">
          <button
            className="btn btn-primary w-100"
            onClick={handleDateFilter}
          >
            <FaFilter className="me-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Attendance Records Table */}
      <div className="attendance-table-wrapper mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">📋 Your Attendance Records</h5>
          <span className="text-muted">
            Showing {paginatedAttendance.length} of {filteredAttendance.length} records
          </span>
        </div>
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-primary">
              <tr>
                <th><FaUser className="me-2" />Name</th>
                <th>Email</th>
                <th><FaClock className="me-2" />Punch In Time</th>
                <th><FaMapMarkerAlt className="me-2" />Punch In Location</th>
                <th><FaClock className="me-2" />Punch Out Time</th>
                <th><FaMapMarkerAlt className="me-2" />Punch Out Location</th>
                <th>Total Hours</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAttendance.length ? (
                paginatedAttendance.map((record) => (
                  <tr key={record._id}>
                    <td className="fw-semibold">{record.userId?.name || userName || "Unknown"}</td>
                    <td>{record.userId?.email || userEmail || "—"}</td>
                    <td>
                      {record.punchIn
                        ? new Date(record.punchIn).toLocaleString("en-IN")
                        : "—"}
                    </td>
                    <td>{renderLocation(record, 'in')}</td>
                    <td>
                      {record.punchOut
                        ? new Date(record.punchOut).toLocaleString("en-IN")
                        : "—"}
                    </td>
                    <td>{renderLocation(record, 'out')}</td>
                    <td className="fw-semibold text-success">
                      {calculateWorkingHours(record.punchIn, record.punchOut)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    {loading ? "Loading..." : "⚠️ No records found"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav aria-label="Attendance records pagination" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FaChevronLeft />
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FaChevronRight />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default PunchInOutPage;
