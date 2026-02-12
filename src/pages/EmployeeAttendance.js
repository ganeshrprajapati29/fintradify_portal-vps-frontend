import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PunchInOut from "../components/PunchInOut";
import "./EmployeeAttendance.css";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Calendar from "react-calendar";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaDownload, FaFilter } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);



const EmployeeAttendance = () => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");

  const API_URL =
    (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
    "https://steelblue-sheep-699352.hostingersite.com";

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stats, setStats] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    totalHours: 0,
    avgHours: 0
  });
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [filterRange, setFilterRange] = useState("7days");


  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/employee/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data?.attendance || []);
      setFilteredAttendance(res.data?.attendance || []);
    } catch (err) {
      console.error("❌ Fetch Attendance error:", err.response?.data || err.message);
      setAttendance([]);
      setFilteredAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Auto update current time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Calculate stats from attendance data
  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthRecords = attendance.filter(rec => {
      const recordDate = new Date(rec.punchIn);
      return recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear;
    });

    const presentDays = monthRecords.filter(rec => rec.punchIn && rec.punchOut).length;
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const absentDays = totalDays - presentDays;

    const totalHours = monthRecords.reduce((sum, rec) => {
      if (rec.punchIn && rec.punchOut) {
        const hours = (new Date(rec.punchOut) - new Date(rec.punchIn)) / (1000 * 60 * 60);
        return sum + hours;
      }
      return sum;
    }, 0);

    const avgHours = presentDays > 0 ? (totalHours / presentDays).toFixed(1) : 0;

    setStats({
      totalDays: totalDays,
      presentDays: presentDays,
      absentDays: absentDays,
      totalHours: totalHours.toFixed(1),
      avgHours: avgHours
    });
  }, [attendance]);



  useEffect(() => {
    let filtered = attendance;

    if (searchEmail.trim()) {
      filtered = filtered.filter((record) =>
        (record.userId?.email || "")
          .toLowerCase()
          .includes(searchEmail.toLowerCase())
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.punchIn || record.punchOut);
        return recordDate >= start && recordDate <= end;
      });
    }

    setFilteredAttendance(filtered);
  }, [searchEmail, startDate, endDate, attendance]);

  // ✅ Filter Attendance Data for Charts
  const chartFilteredAttendance = useMemo(() => {
    const now = new Date();
    let start;
    if (filterRange === "today") {
      start = new Date(now.setHours(0, 0, 0, 0));
    } else if (filterRange === "7days") {
      start = new Date();
      start.setDate(start.getDate() - 6);
    } else {
      start = new Date();
      start.setMonth(start.getMonth() - 1);
    }

    return attendance.filter(
      (rec) =>
        new Date(rec.punchIn) >= start && new Date(rec.punchIn) <= new Date()
    );
  }, [attendance, filterRange]);

  // ✅ Calculate hours per day for charts
  const dayHoursMap = {};
  chartFilteredAttendance.forEach((rec) => {
    const punchIn = new Date(rec.punchIn);
    const punchOut = rec.punchOut ? new Date(rec.punchOut) : null;
    const key = punchIn.toDateString();

    // If today & no punch out → count live time
    if (!punchOut && key === new Date().toDateString()) {
      const liveHours = (currentTime - punchIn) / (1000 * 60 * 60);
      dayHoursMap[key] = liveHours;
    } else if (punchOut) {
      const hours = (punchOut - punchIn) / (1000 * 60 * 60);
      dayHoursMap[key] = (dayHoursMap[key] || 0) + hours;
    }
  });

  // ✅ Chart Data
  const dateRange = Object.keys(dayHoursMap).map((d) => new Date(d));
  const attendanceLabels =
    filterRange === "today"
      ? ["Today"]
      : dateRange.map((d) =>
          d.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          })
        );
  const attendanceValues =
    filterRange === "today"
      ? [parseFloat(Object.values(dayHoursMap)[0]?.toFixed(2)) || 0]
      : dateRange.map((d) => parseFloat(dayHoursMap[d.toDateString()]?.toFixed(2)) || 0);

  const attendanceChartData = useMemo(
    () => ({
      labels: attendanceLabels,
      datasets: [
        {
          label: "Working Hours",
          data: attendanceValues,
          backgroundColor: "#0f3460",
          borderRadius: 6,
        },
      ],
    }),
    [attendanceLabels, attendanceValues]
  );

  // ✅ Doughnut Chart Data
  const doughnutData = {
    labels: ['Present Days', 'Absent Days'],
    datasets: [{
      data: [stats.presentDays, stats.absentDays],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 0,
    }],
  };

  // ✅ Calendar Navigation
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };
  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const monthDays = Array.from(
    { length: daysInMonth },
    (_, i) => new Date(calendarYear, calendarMonth, i + 1)
  );
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay();
  const blankDays = Array(firstDayOfWeek).fill(null);
  const presentDays = new Set(Object.keys(dayHoursMap));

  // ✅ Calendar highlight
  const tileClassName = ({ date, view }) => {
    if (view === "month" && Array.isArray(attendance)) {
      const dateStr = date.toDateString();
      const rec = attendance.find(
        (r) => r.punchIn && new Date(r.punchIn).toDateString() === dateStr
      );
      if (rec) return "present-day";
      const today = new Date().toDateString();
      if (dateStr < today) return "absent-day";
    }
    return null;
  };



  const groupedByMonth = filteredAttendance.reduce((acc, record) => {
    const date = new Date(record.punchIn || record.punchOut);
    if (!isNaN(date)) {
      const key = `${date.toLocaleString("default", { month: "long" })}-${date.getFullYear()}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(record);
    }
    return acc;
  }, {});

  const createCSV = (data) => {
    const headers = [
      "Employee",
      "Email",
      "Punch In Time",
      "Punch In Location",
      "Punch Out Time",
      "Punch Out Location",
      "Total Hours Worked",
    ];

    const rows = data.map((record) => [
      record.userId?.name || userName || "Unknown",
      record.userId?.email || userEmail || "—",
      record.punchIn ? new Date(record.punchIn).toLocaleString("en-IN") : "—",
      record.punchInLocation
        ? `${record.punchInLocation.latitude}, ${record.punchInLocation.longitude}`
        : "—",
      record.punchOut ? new Date(record.punchOut).toLocaleString("en-IN") : "—",
      record.punchOutLocation
        ? `${record.punchOutLocation.latitude}, ${record.punchOutLocation.longitude}`
        : "—",
      calculateWorkingHours(record.punchIn, record.punchOut),
    ]);

    return (
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n")
    );
  };

  // ✅ Download CSV by Month (client-side for now, can be moved to backend later)
  const downloadCSVByMonth = (monthKey) => {
    const data = groupedByMonth[monthKey];
    if (!data || !data.length) {
      alert(`⚠️ No data for ${monthKey}`);
      return;
    }
    const csvContent = createCSV(data);
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `attendance_${monthKey}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadFilteredCSV = () => {
    if (!filteredAttendance.length) {
      alert("⚠️ No filtered data available!");
      return;
    }
    const csvContent = createCSV(filteredAttendance);
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `attendance_filtered_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ✅ NEW: Function to calculate total working hours
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
    <div className="attendance-dashboard">
      {/* 🌞 Floating Sun */}
      <div className="floating-sun"></div>
      {/* 🕊️ Flying Bird */}
      <div className="flying-bird"></div>

      <div className="container-fluid px-4 py-4">
        {/* ✅ Header Section */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary mb-2">
              <FaClock className="me-2" />
              Live Attendance Dashboard
            </h2>
            <p className="text-muted mb-3">Real-time tracking of your work hours and attendance</p>

            {/* Filter Buttons */}
            <div className="d-flex flex-wrap gap-2">
              {[
                { label: "Today", value: "today" },
                { label: "Last 7 Days", value: "7days" },
                { label: "Last 1 Month", value: "month" },
              ].map((btn) => (
                <button
                  key={btn.value}
                  className={`btn btn-sm px-3 fw-semibold ${
                    filterRange === btn.value ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setFilterRange(btn.value)}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Time & Today's Hours */}
          <div className="text-end">
            <div className="d-flex align-items-center gap-3">
              <div>
                <small className="text-muted">Current Time</small>
                <h5 className="fw-bold text-primary mb-0">{currentTime.toLocaleTimeString()}</h5>
              </div>
              <div>
                <small className="text-muted">Today's Hours</small>
                <h5 className="fw-bold text-success mb-0">{Object.values(dayHoursMap)[0]?.toFixed(2) || 0} hrs</h5>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Stats Cards */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card stat-card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaCalendarAlt className="text-primary mb-2" size={24} />
                <h4 className="fw-bold text-primary">{stats.totalDays}</h4>
                <small className="text-muted">Total Days</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card stat-card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaCheckCircle className="text-success mb-2" size={24} />
                <h4 className="fw-bold text-success">{stats.presentDays}</h4>
                <small className="text-muted">Present Days</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card stat-card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaTimesCircle className="text-danger mb-2" size={24} />
                <h4 className="fw-bold text-danger">{stats.absentDays}</h4>
                <small className="text-muted">Absent Days</small>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card stat-card h-100 border-0 shadow-sm">
              <div className="card-body text-center">
                <FaClock className="text-warning mb-2" size={24} />
                <h4 className="fw-bold text-warning">{stats.avgHours}</h4>
                <small className="text-muted">Avg Hours/Day</small>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Charts Section */}
        <div className="row mb-4">
          {/* Bar Chart */}
          <div className="col-lg-8 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-primary text-white">
                <h6 className="mb-0">
                  <FaClock className="me-2" />
                  Working Hours Overview
                </h6>
              </div>
              <div className="card-body">
                <div style={{ height: "400px" }}>
                  <Bar data={attendanceChartData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text:
                          filterRange === "today"
                            ? "Today's Real-Time Working Hours"
                            : filterRange === "7days"
                            ? "Last 7 Days Working Hours"
                            : "Last 1 Month Working Hours",
                        color: "#0f3460",
                        font: { size: 18, weight: "bold" },
                      },
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.raw.toFixed(2)} hours`,
                        },
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: { display: true, text: "Hours", color: "#0f3460" },
                      },
                      x: { ticks: { color: "#0f3460" } },
                    },
                  }} />
                </div>
              </div>
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="col-lg-4 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-success text-white">
                <h6 className="mb-0">
                  <FaCalendarAlt className="me-2" />
                  Monthly Attendance
                </h6>
              </div>
              <div className="card-body">
                <div style={{ height: "300px" }}>
                  <Doughnut data={doughnutData} options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.label}: ${ctx.raw} days`,
                        },
                      },
                    },
                  }} />
                </div>
                <div className="text-center mt-3">
                  <div className="d-flex justify-content-center gap-3">
                    <div className="d-flex align-items-center">
                      <div className="badge bg-success me-2">&nbsp;</div>
                      <small>Present: {stats.presentDays}</small>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="badge bg-danger me-2">&nbsp;</div>
                      <small>Absent: {stats.absentDays}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Calendar Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <FaCalendarAlt className="me-2" />
                  Attendance Calendar
                </h6>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-light" onClick={handlePrevMonth}>
                    ← Prev
                  </button>
                  <span className="fw-semibold">
                    {new Date(calendarYear, calendarMonth).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                  <button className="btn btn-sm btn-light" onClick={handleNextMonth}>
                    Next →
                  </button>
                </div>
              </div>
              <div className="card-body">
                <Calendar
                  onChange={() => {}}
                  value={new Date(calendarYear, calendarMonth)}
                  tileClassName={tileClassName}
                  showNavigation={false}
                  className="custom-calendar"
                />
                <div className="mt-3 d-flex justify-content-center gap-4">
                  <div className="d-flex align-items-center">
                    <div className="calendar-legend present me-2"></div>
                    <small>Present</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="calendar-legend absent me-2"></div>
                    <small>Absent</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="calendar-legend today me-2"></div>
                    <small>Today</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Filters and Export Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-secondary text-white">
                <h6 className="mb-0">
                  <FaFilter className="me-2" />
                  Filters & Export
                </h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Search by Email</label>
                    <input
                      type="text"
                      placeholder="e.g. employee@company.com"
                      className="form-control"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button className="btn btn-success w-100" onClick={downloadFilteredCSV}>
                      <FaDownload className="me-2" />
                      Export All
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Month Download Buttons */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-warning text-dark">
                <h6 className="mb-0">
                  <FaDownload className="me-2" />
                  Download Attendance by Month
                </h6>
              </div>
              <div className="card-body">
                {Object.keys(groupedByMonth).length ? (
                  <div className="d-flex flex-wrap gap-2">
                    {Object.keys(groupedByMonth).map((monthKey) => (
                      <button
                        key={monthKey}
                        className="btn btn-primary"
                        onClick={() => downloadCSVByMonth(monthKey)}
                      >
                        <FaDownload className="me-2" />
                        {monthKey}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">No monthly data available</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Enhanced Table */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-dark text-white">
                <h6 className="mb-0">
                  <FaClock className="me-2" />
                  Detailed Attendance Records
                </h6>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th><FaCheckCircle className="me-1" />Employee</th>
                        <th>Email</th>
                        <th><FaClock className="me-1" />Punch In</th>
                        <th><FaMapMarkerAlt className="me-1" />In Location</th>
                        <th><FaClock className="me-1" />Punch Out</th>
                        <th><FaMapMarkerAlt className="me-1" />Out Location</th>
                        <th><FaClock className="me-1" />Total Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.length ? (
                        filteredAttendance.map((record) => (
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
                            <td className="fw-bold text-success">
                              {calculateWorkingHours(record.punchIn, record.punchOut)}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            <FaTimesCircle className="text-muted mb-2" size={24} />
                            <p className="text-muted mb-0">No records found</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendance; 
   