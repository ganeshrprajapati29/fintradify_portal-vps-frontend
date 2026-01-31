import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosInstance';

const PayrollProcessing = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  useEffect(() => {
    fetchPayrollData();
  }, [selectedMonth]);

  const fetchPayrollData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/payroll?month=${selectedMonth}`);
      setPayrollData(response.data);
    } catch (err) {
      setError('Failed to fetch payroll data');
      console.error('Error fetching payroll:', err);
    } finally {
      setLoading(false);
    }
  };

  const processPayroll = async () => {
    try {
      await axios.post('/api/payroll/process', { month: selectedMonth });
      alert('Payroll processed successfully!');
      fetchPayrollData();
    } catch (err) {
      alert('Failed to process payroll');
      console.error('Error processing payroll:', err);
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
      <h2 className="mb-4">Payroll Processing</h2>

      <div className="row mb-4">
        <div className="col-md-6">
          <label htmlFor="monthSelect" className="form-label">Select Month</label>
          <input
            type="month"
            className="form-control"
            id="monthSelect"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
        <div className="col-md-6 d-flex align-items-end">
          <button
            className="btn btn-primary"
            onClick={processPayroll}
          >
            Process Payroll
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">Payroll Records for {selectedMonth}</h5>
        </div>
        <div className="card-body">
          {payrollData.length === 0 ? (
            <p className="text-muted">No payroll records found for this month.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Basic Salary</th>
                    <th>Deductions</th>
                    <th>Net Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.employeeId}</td>
                      <td>{record.employeeName}</td>
                      <td>${record.basicSalary?.toFixed(2)}</td>
                      <td>${record.deductions?.toFixed(2)}</td>
                      <td>${record.netSalary?.toFixed(2)}</td>
                      <td>
                        <span className={`badge ${record.status === 'Processed' ? 'bg-success' : 'bg-warning'}`}>
                          {record.status}
                        </span>
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

export default PayrollProcessing;
