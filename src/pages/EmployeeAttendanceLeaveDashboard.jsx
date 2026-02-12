import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
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
import { FaClock, FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaDownload } from "react-icons/fa";
import "./CalendarAttendance.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const API_URL =
  (process.env.REACT_APP_API_URL && process.env.REACT_APP_API_URL.trim()) ||
  "https://steelblue-sheep-699352.hostingersite.com";

const EmployeeAttendanceDashboard = () => {
  const token = localStorage.getItem("token");
  const [attendance, setAttendance] = useState([]);
  const [filterRange, setFilterRange] = useState("7days");
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [todayHours, setTodayHours] = useState(0);
  const [stats, setStats] = useState({
    totalDays: 0,
    presentDays: 0,
    absentDays: 0,
    totalHours: 0,
    avgHours: 0
  });

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

  // ✅ Fetch attendance data
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/employee/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAttendance(res.data.attendance || res.data || []);
    } catch (err) {
      console.error("❌ Attendance fetch error:", err.response?.data || err.message);
      setAttendance([]);
    }
  };

  // ✅ Download Attendance CSV
  const downloadAttendanceCSV = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/employee/attendance/csv`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Important for file download
      });

      // Create a blob link to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'attendance.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      console.log("✅ Attendance CSV downloaded successfully");
    } catch (err) {
      console.error("❌ CSV download error:", err.response?.data || err.message);
      alert("Failed to download attendance CSV. Please try again.");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Calculate today's working hours (real-time)
  useEffect(() => {
    const todayStr = new Date().toISOString().split("T")[0];
    const todayRecords = attendance.filter((rec) => {
      const inDate = new Date(rec.punchIn).toISOString().split("T")[0];
      return inDate === todayStr;
    });

    if (todayRecords.length > 0) {
      const record = todayRecords[0];
      const punchIn = new Date(record.punchIn);
      const punchOut = record.punchOut ? new Date(record.punchOut) : currentTime;
      const diffHrs = (punchOut - punchIn) / (1000 * 60 * 60);
      setTodayHours(diffHrs > 0 ? diffHrs.toFixed(2) : 0);
    } else {
      setTodayHours(0);
    }
  }, [attendance, currentTime]);

  // ✅ Filter Attendance Data
  const filteredAttendance = useMemo(() => {
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

  // ✅ Calculate hours per day
  const dayHoursMap = {};
  filteredAttendance.forEach((rec) => {
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

  // ✅ Graph Data
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
      ? [parseFloat(todayHours)]
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

  // ✅ Graph Options
  const attendanceOptions = {
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

  // ✅ Doughnut Chart Data
  const doughnutData = {
    labels: ['Present Days', 'Absent Days'],
    datasets: [{
      data: [stats.presentDays, stats.absentDays],
      backgroundColor: ['#10b981', '#ef4444'],
      borderWidth: 0,
    }],
  };

  const doughnutOptions = {
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
  };

  // ✅ Render
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

          {/* Live Time & Today's Hours & Download Button */}
          <div className="text-end">
            <div className="d-flex align-items-center gap-3 mb-2">
              <div>
                <small className="text-muted">Current Time</small>
                <h5 className="fw-bold text-primary mb-0">{currentTime.toLocaleTimeString()}</h5>
              </div>
              <div>
                <small className="text-muted">Today's Hours</small>
                <h5 className="fw-bold text-success mb-0">{todayHours} hrs</h5>
              </div>
            </div>
            {/* Download CSV Button */}
            <button
              className="btn btn-success btn-sm px-3 fw-semibold"
              onClick={downloadAttendanceCSV}
            >
              <FaDownload className="me-2" />
              Download CSV
            </button>
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
                  <Bar data={attendanceChartData} options={attendanceOptions} />
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
                  <Doughnut data={doughnutData} options={doughnutOptions} />
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
        <div className="row">
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
                <div className="calendar-grid">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="calendar-header text-primary fw-semibold">
                      {day}
                    </div>
                  ))}
                  {blankDays.map((_, i) => (
                    <div key={`blank-${i}`} className="calendar-day empty"></div>
                  ))}
                  {monthDays.map((date, idx) => {
                    const dateStr = date.toDateString();
                    const isPresent = presentDays.has(dateStr);
                    const isToday = date.toDateString() === new Date().toDateString();
                    return (
                      <div
                        key={idx}
                        className={`calendar-day ${isPresent ? "present-day" : "absent-day"} ${isToday ? "today" : ""}`}
                      >
                        <span className="date-number">{date.getDate()}</span>
                        {isToday && <div className="today-indicator"></div>}
                      </div>
                    );
                  })}
                </div>

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
      </div>
    </div>
  );
};

export default EmployeeAttendanceDashboard;
