import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PunchInOut.css";

const PunchInOut = () => {
  const token = localStorage.getItem("token");
  const API_URL = process.env.REACT_APP_API_URL;

  const [status, setStatus] = useState("loading");
  const [attendance, setAttendance] = useState([]);
  const [todayRecord, setTodayRecord] = useState(null);
  const [isPunching, setIsPunching] = useState(false);
  const [locationStatus, setLocationStatus] = useState("idle"); // idle, getting, success, error
  const [currentLocation, setCurrentLocation] = useState(null);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });

  // ✅ Always ensure data is an array
  const ensureArray = (data) =>
    Array.isArray(data) ? data : data ? [data] : [];

  // ✅ Convert Date → YYYY-MM-DD
  const toLocalDateString = (dateInput) => {
    const d = new Date(dateInput);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const todayStr = toLocalDateString(new Date());

  // ✅ Get user location (optional)
  const getLocation = async () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        return resolve({ latitude: null, longitude: null });
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => resolve({ latitude: null, longitude: null })
      );
    });
  };

  // ✅ Fetch Attendance
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/employee/attendance`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const records = ensureArray(res.data.attendance);

      // Auto punch-out if yesterday incomplete
      if (records.length) {
        const last = records[records.length - 1];
        const lastDate = toLocalDateString(last.punchIn);
        if (lastDate !== todayStr && !last.punchOut) {
          try {
            await axios.post(
              `${API_URL}/api/employee/auto-punch-out`,
              { recordId: last._id },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("✅ Auto punch-out done for previous day");
          } catch (err) {
            console.error("Auto punch-out failed:", err.message);
          }
        }
      }

      const todayRec = records.find(
        (rec) => toLocalDateString(rec.punchIn) === todayStr
      );

      setAttendance(records);
      setTodayRecord(todayRec || null);

      if (!todayRec) setStatus("none");
      else if (todayRec && !todayRec.punchOut) setStatus("punchedIn");
      else setStatus("punchedOut");
    } catch (err) {
      console.error("Fetch Attendance Error:", err.message);
      setAttendance([]); // ensure it's always an array
      setStatus("none");
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // ✅ Auto-refresh at midnight
  useEffect(() => {
    const now = new Date();
    const millisTillMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5) -
      now;
    const timer = setTimeout(fetchAttendance, millisTillMidnight);
    return () => clearTimeout(timer);
  }, [attendance]);

  // ✅ Punch In with enhanced UX
  const handlePunchIn = async () => {
    if (status === "punchedIn") {
      setNotification({ show: true, type: "warning", message: "⚠️ Already punched in today!" });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
      return;
    }
    if (status === "punchedOut") {
      setNotification({ show: true, type: "info", message: "✅ You've already completed today's attendance." });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
      return;
    }

    setIsPunching(true);
    setNotification({ show: true, type: "info", message: "🔄 Getting location and punching in..." });

    try {
      setLocationStatus("getting");
      const loc = await getLocation();
      setLocationStatus("success");
      setCurrentLocation(loc);

      setNotification({ show: true, type: "info", message: "🔄 Processing punch in..." });

      const res = await axios.post(
        `${API_URL}/api/employee/punch-in`,
        { latitude: loc.latitude, longitude: loc.longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedAttendance = ensureArray(res.data.attendance);
      setAttendance(updatedAttendance);

      const todayRec = updatedAttendance.find(
        (rec) => toLocalDateString(rec.punchIn) === todayStr
      );
      setTodayRecord(todayRec || null);

      setStatus("punchedIn");
      setNotification({ show: true, type: "success", message: "✅ Punched In successfully! Location recorded." });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
    } catch (err) {
      console.error("Punch In Error:", err.message);
      setLocationStatus("error");
      setNotification({ show: true, type: "error", message: err.response?.data?.msg || "Punch In failed. Please try again." });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
    } finally {
      setIsPunching(false);
      setLocationStatus("idle");
    }
  };

  // ✅ Punch Out with enhanced UX
  const handlePunchOut = async () => {
    if (status !== "punchedIn" || isPunching) {
      setNotification({ show: true, type: "warning", message: "⚠️ Please punch in first before punching out." });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
      return;
    }

    setIsPunching(true);
    setNotification({ show: true, type: "info", message: "🔄 Punching out..." });

    try {
      const loc = await getLocation();
      const res = await axios.post(
        `${API_URL}/api/employee/punch-out`,
        { latitude: loc.latitude, longitude: loc.longitude },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedAttendance = ensureArray(res.data.attendance);
      setAttendance(updatedAttendance);

      const todayRec = updatedAttendance.find(
        (rec) => toLocalDateString(rec.punchIn) === todayStr
      );
      setTodayRecord(todayRec || null);

      setStatus("punchedOut");
      setNotification({ show: true, type: "success", message: "✅ Punched Out successfully!" });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 3000);
    } catch (err) {
      console.error("Punch Out Error:", err.message);
      setNotification({ show: true, type: "error", message: err.response?.data?.msg || "Punch Out failed." });
      setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
    } finally {
      setIsPunching(false);
    }
  };

  // ✅ Calendar highlight
  const tileClassName = ({ date, view }) => {
    if (view === "month" && Array.isArray(attendance)) {
      const dateStr = toLocalDateString(date);
      const rec = attendance.find(
        (r) => r.punchIn && toLocalDateString(r.punchIn) === dateStr
      );
      if (rec) return "present-day";
      const today = toLocalDateString(new Date());
      if (dateStr < today) return "absent-day";
    }
    return null;
  };

  if (status === "loading") return <p>Checking attendance...</p>;

  return (
    <div className="punch-container my-4 text-center">
      {/* Notification */}
      {notification.show && (
        <div className={`alert alert-${notification.type === 'success' ? 'success' : notification.type === 'error' ? 'danger' : notification.type === 'warning' ? 'warning' : 'info'} alert-dismissible fade show mb-3`} role="alert">
          {notification.message}
          <button type="button" className="btn-close" onClick={() => setNotification({ show: false, type: "", message: "" })}></button>
        </div>
      )}

      {/* Status Card */}
      <div className="card mb-4 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Today's Attendance Status</h5>
          <div className={`badge fs-6 ${status === 'punchedIn' ? 'bg-success' : status === 'punchedOut' ? 'bg-info' : 'bg-secondary'}`}>
            {status === 'punchedIn' ? '🟢 Punched In' : status === 'punchedOut' ? '🔵 Completed' : '⚪ Not Started'}
          </div>
        </div>
      </div>

      {/* ✅ Buttons */}
      <div className="button-group mb-4">
        <button
          className="btn btn-success btn-lg me-3 shadow"
          onClick={handlePunchIn}
          disabled={isPunching || status === "punchedIn" || status === "punchedOut"}
        >
          {isPunching ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Punching In...
            </>
          ) : (
            <>
              <i className="fas fa-sign-in-alt me-2"></i>
              Punch In
            </>
          )}
        </button>
        <button
          className="btn btn-danger btn-lg shadow"
          onClick={handlePunchOut}
          disabled={isPunching || status !== "punchedIn"}
        >
          {isPunching ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
              Punching Out...
            </>
          ) : (
            <>
              <i className="fas fa-sign-out-alt me-2"></i>
              Punch Out
            </>
          )}
        </button>
      </div>

      {/* ✅ Today's Record */}
      {todayRecord && (
        <div className="bg-light p-3 rounded-3 mb-3 shadow-sm">
          <p className="mb-1">
            <strong>Punch In:</strong>{" "}
            {new Date(todayRecord.punchIn).toLocaleTimeString()}
          </p>
          <p className="mb-0">
            <strong>Punch Out:</strong>{" "}
            {todayRecord.punchOut
              ? new Date(todayRecord.punchOut).toLocaleTimeString()
              : "— Not yet —"}
          </p>
        </div>
      )}


    </div>
  );
};

export default PunchInOut;
