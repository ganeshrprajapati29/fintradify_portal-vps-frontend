import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const AttendanceTracking = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchAttendanceData();
  }, [selectedDate]);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/attendance?date=${selectedDate}`);
      setAttendanceData(response.data);
    } catch (err) {
      setError('Failed to fetch attendance data');
      console.error('Error fetching attendance:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (employeeId, status) => {
    try {
      await axios.post('/api/attendance/mark', {
        employeeId,
        date: selectedDate,
        status
      });
      fetchAttendanceData();
    } catch (err) {
      alert('Failed to mark attendance');
      console.error('Error marking attendance:', err);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attendance Tracking</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="dateSelect" className="form-label">Select Date</label>
          <input
            type="date"
            className="form-control"
            id="dateSelect"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Attendance for {new Date(selectedDate).toLocaleDateString()}</h5>
        </div>
        <div className="card-body">
          {attendanceData.length === 0 ? (
            <p className="text-muted">No attendance records found for this date.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Check-in Time</th>
                    <th>Check-out Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.employeeId}</td>
                      <td>{record.employeeName}</td>
                      <td>{record.department}</td>
                      <td>{record.checkInTime || '-'}</td>
                      <td>{record.checkOutTime || '-'}</td>
                      <td>
                        <span className={`badge ${
                          record.status === 'Present' ? 'bg-success' :
                          record.status === 'Absent' ? 'bg-danger' :
                          record.status === 'Late' ? 'bg-warning' : 'bg-secondary'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-success"
                            onClick={() => markAttendance(record.employeeId, 'Present')}
                          >
                            Present
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => markAttendance(record.employeeId, 'Absent')}
                          >
                            Absent
                          </button>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => markAttendance(record.employeeId, 'Late')}
                          >
                            Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracking;
